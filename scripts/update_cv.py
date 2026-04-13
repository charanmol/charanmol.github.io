import copy
import io
import os
import shutil
import tempfile
import zipfile
from xml.etree import ElementTree as ET


W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
NS = {"w": W_NS}
W = f"{{{W_NS}}}"


def w_tag(name: str) -> str:
    return f"{W}{name}"


def paragraph_text(p):
    return "".join((t.text or "") for t in p.findall(".//w:t", NS)).strip()


def register_namespaces(xml_bytes):
    seen = set()
    for event, elem in ET.iterparse(io.BytesIO(xml_bytes), events=("start-ns",)):
        prefix, uri = elem
        key = (prefix or "", uri)
        if key in seen:
            continue
        ET.register_namespace(prefix or "", uri)
        seen.add(key)


def first_run_with_text(p):
    for run in p.findall("w:r", NS):
        if any((t.text or "") for t in run.findall(".//w:t", NS)):
            return run
    return None


def clone_paragraph_with_text(template, text):
    new_p = copy.deepcopy(template)
    # Keep paragraph formatting, replace all runs with a single run copied from the first text run.
    for child in list(new_p):
        if child.tag == w_tag("r"):
            new_p.remove(child)

    run_template = first_run_with_text(template)
    if run_template is None:
        run_template = ET.Element(w_tag("r"))
        ET.SubElement(run_template, w_tag("t"))

    new_run = copy.deepcopy(run_template)
    for t in new_run.findall(".//w:t", NS):
        t.text = ""

    text_nodes = new_run.findall(".//w:t", NS)
    if not text_nodes:
        text_node = ET.SubElement(new_run, w_tag("t"))
        text_nodes = [text_node]

    text_nodes[0].text = text
    new_p.append(new_run)
    return new_p


def set_style_sizes(styles_root):
    for style_id, size, after, line in [
        ("Normal", "19", "36", "216"),
        ("Heading1", "20", "8", "216"),
    ]:
        style = styles_root.find(f".//w:style[@w:styleId='{style_id}']", NS)
        if style is None:
            continue

        rpr = style.find("w:rPr", NS)
        if rpr is None:
            rpr = ET.SubElement(style, w_tag("rPr"))
        sz = rpr.find("w:sz", NS)
        if sz is None:
            sz = ET.SubElement(rpr, w_tag("sz"))
        sz.set(w_tag("val"), size)

        ppr = style.find("w:pPr", NS)
        if ppr is None:
            ppr = ET.SubElement(style, w_tag("pPr"))
        spacing = ppr.find("w:spacing", NS)
        if spacing is None:
            spacing = ET.SubElement(ppr, w_tag("spacing"))
        spacing.set(w_tag("after"), after)
        spacing.set(w_tag("line"), line)
        spacing.set(w_tag("lineRule"), "auto")


def tighten_page_margins(body):
    sect = body.find("w:sectPr", NS)
    if sect is None:
        return
    pg_mar = sect.find("w:pgMar", NS)
    if pg_mar is None:
        return
    pg_mar.set(w_tag("top"), "900")
    pg_mar.set(w_tag("bottom"), "900")
    pg_mar.set(w_tag("left"), "720")
    pg_mar.set(w_tag("right"), "720")


def update_projects(body):
    children = list(body)
    projects_idx = None
    skills_idx = None
    for idx, child in enumerate(children):
        if child.tag != w_tag("p"):
            continue
        text = paragraph_text(child)
        if text == "PROJECTS":
            projects_idx = idx
        elif text == "TECHNICAL SKILLS":
            skills_idx = idx
            break

    if projects_idx is None or skills_idx is None:
        raise RuntimeError("Could not locate PROJECTS or TECHNICAL SKILLS section.")

    title_template = children[projects_idx + 2]
    desc_template = children[projects_idx + 3]

    new_entries = [
        ("Real Estate Management System 2024-2025", "Built an AVL tree application for efficient property listing management."),
        ("MedicTime: Medical AI Voice Agent 2024-2025", "Built a medical voice agent with Whisper, Llama 3, Kokoro TTS, and ChromaDB RAG over 24,000+ documents."),
        ("Cybersecurity Home Lab: SSH Brute-Force Detection 2024-2025", "Simulated SSH brute-force attacks and built Splunk SIEM detections with tuned alerting pipelines."),
        ("Hotel Management System: Secure Web Application 2026", "Built a secure Flask/PostgreSQL check-in app with parameterized queries, Pydantic validation, and RBAC."),
        ("Inventory Management Application 2026", "Built a Kivy-based inventory management application."),
        ("SecureReview 2026", "Built a tool that checks code for vulnerabilities before pushing."),
        ("Barter 2026", "Built a group bill-splitting app for roommates, trips, and hangouts."),
        ("Sarega 2026", "Built a mobile musician notes app for drum patterns, lyrics, vocals, and recordings."),
    ]

    for idx in range(skills_idx - 1, projects_idx, -1):
        body.remove(children[idx])

    insert_at = projects_idx + 1
    for title, desc in new_entries:
        body.insert(insert_at, clone_paragraph_with_text(title_template, title))
        insert_at += 1
        desc_p = clone_paragraph_with_text(desc_template, desc)
        ppr = desc_p.find("w:pPr", NS)
        if ppr is None:
            ppr = ET.SubElement(desc_p, w_tag("pPr"))
        spacing = ppr.find("w:spacing", NS)
        if spacing is None:
            spacing = ET.SubElement(ppr, w_tag("spacing"))
        spacing.set(w_tag("after"), "18")
        body.insert(insert_at, desc_p)
        insert_at += 1


def remove_blank_paragraphs(body):
    for child in list(body):
        if child.tag == w_tag("p") and not paragraph_text(child):
            body.remove(child)


def process_docx(path, out_path=None):
    workspace_tmp = os.path.join(os.getcwd(), ".tmp_cv_work")
    os.makedirs(workspace_tmp, exist_ok=True)
    temp_dir = tempfile.mkdtemp(prefix="cv_update_", dir=workspace_tmp)
    try:
        with zipfile.ZipFile(path) as zf:
            zf.extractall(temp_dir)
            document_xml = zf.read("word/document.xml")
            styles_xml = zf.read("word/styles.xml")

        doc_path = os.path.join(temp_dir, "word", "document.xml")
        styles_path = os.path.join(temp_dir, "word", "styles.xml")

        register_namespaces(document_xml)
        register_namespaces(styles_xml)

        doc_tree = ET.parse(doc_path)
        doc_root = doc_tree.getroot()
        body = doc_root.find("w:body", NS)
        if body is None:
            raise RuntimeError("Could not locate document body.")

        styles_tree = ET.parse(styles_path)
        styles_root = styles_tree.getroot()

        update_projects(body)
        remove_blank_paragraphs(body)
        tighten_page_margins(body)
        set_style_sizes(styles_root)

        ET.register_namespace("w", W_NS)
        ET.register_namespace("w14", "http://schemas.microsoft.com/office/word/2010/wordml")
        ET.register_namespace("w15", "http://schemas.microsoft.com/office/word/2012/wordml")
        ET.register_namespace("w16se", "http://schemas.microsoft.com/office/word/2015/wordml/symex")
        doc_tree.write(doc_path, encoding="utf-8", xml_declaration=True)
        styles_tree.write(styles_path, encoding="utf-8", xml_declaration=True)

        backup_path = None
        target_path = out_path or path
        if os.path.abspath(target_path) == os.path.abspath(path):
            backup_path = os.path.splitext(path)[0] + ".backup.docx"
            shutil.copy2(path, backup_path)

        with zipfile.ZipFile(target_path, "w", compression=zipfile.ZIP_DEFLATED) as out_zip:
            for root, _, files in os.walk(temp_dir):
                for file_name in files:
                    full_path = os.path.join(root, file_name)
                    rel_path = os.path.relpath(full_path, temp_dir)
                    out_zip.write(full_path, rel_path)

        return target_path, backup_path
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


if __name__ == "__main__":
    target = os.environ.get("CV_PATH")
    if not target:
        raise SystemExit("CV_PATH environment variable is required.")
    out_path = os.environ.get("CV_OUT_PATH")
    updated, backup = process_docx(target, out_path=out_path)
    print(f"Updated: {updated}")
    if backup:
        print(f"Backup: {backup}")
