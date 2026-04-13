$ErrorActionPreference = "Stop"

$inputPath = $env:CV_PATH
$outputPath = $env:CV_OUT_PATH

if (-not $inputPath) {
  throw "CV_PATH environment variable is required."
}

if (-not $outputPath) {
  $outputPath = $inputPath
}

$wdCollapseEnd = 0
$wdStatisticPages = 2
$wdLineSpaceSingle = 0
$wdFormatXMLDocument = 12

function Get-ParagraphText($paragraph) {
  return ($paragraph.Range.Text -replace "[`r`a]", "").Trim()
}

function Find-ParagraphIndex($doc, $targetText) {
  for ($i = 1; $i -le $doc.Paragraphs.Count; $i++) {
    if ((Get-ParagraphText $doc.Paragraphs.Item($i)) -eq $targetText) {
      return $i
    }
  }
  throw "Could not find paragraph: $targetText"
}

$projectLines = @(
  "Real Estate Management System 2024-2025",
  "Built an AVL tree application for efficient property listing management.",
  "MedicTime: Medical AI Voice Agent 2024-2025",
  "Built a medical voice agent with Whisper, Llama 3, Kokoro TTS, and ChromaDB RAG over 24,000+ documents.",
  "Cybersecurity Home Lab: SSH Brute-Force Detection 2024-2025",
  "Simulated SSH brute-force attacks and built Splunk SIEM detections with tuned alerting pipelines.",
  "Hotel Management System: Secure Web Application 2026",
  "Built a secure Flask/PostgreSQL check-in app with parameterized queries, Pydantic validation, and RBAC.",
  "Inventory Management Application 2026",
  "Built a Kivy-based inventory management application.",
  "SecureReview 2026",
  "Built a tool that checks code for vulnerabilities before pushing.",
  "Barter 2026",
  "Built a group bill-splitting app for roommates, trips, and hangouts.",
  "Sarega 2026",
  "Built a mobile musician notes app for drum patterns, lyrics, vocals, and recordings."
)

$word = New-Object -ComObject Word.Application
$word.Visible = $false

try {
  $doc = $word.Documents.Open($inputPath)

  $doc.PageSetup.TopMargin = $word.InchesToPoints(0.55)
  $doc.PageSetup.BottomMargin = $word.InchesToPoints(0.55)
  $doc.PageSetup.LeftMargin = $word.InchesToPoints(0.5)
  $doc.PageSetup.RightMargin = $word.InchesToPoints(0.5)

  $normalStyle = $doc.Styles.Item("Normal")
  $normalStyle.Font.Name = "Arial"
  $normalStyle.Font.Size = 9.5
  $normalStyle.ParagraphFormat.SpaceAfter = 0
  $normalStyle.ParagraphFormat.LineSpacingRule = $wdLineSpaceSingle

  $headingStyle = $doc.Styles.Item("Heading 1")
  $headingStyle.Font.Name = "Arial"
  $headingStyle.Font.Size = 10
  $headingStyle.Font.Bold = $true
  $headingStyle.ParagraphFormat.SpaceAfter = 2
  $headingStyle.ParagraphFormat.LineSpacingRule = $wdLineSpaceSingle

  for ($i = $doc.Paragraphs.Count; $i -ge 1; $i--) {
    if ([string]::IsNullOrWhiteSpace((Get-ParagraphText $doc.Paragraphs.Item($i)))) {
      $doc.Paragraphs.Item($i).Range.Delete()
    }
  }

  $projectsIndex = Find-ParagraphIndex $doc "PROJECTS"
  $skillsIndex = Find-ParagraphIndex $doc "TECHNICAL SKILLS"

  for ($i = $skillsIndex - 1; $i -gt $projectsIndex; $i--) {
    $doc.Paragraphs.Item($i).Range.Delete()
  }

  $projectsIndex = Find-ParagraphIndex $doc "PROJECTS"
  $skillsIndex = Find-ParagraphIndex $doc "TECHNICAL SKILLS"

  $insertRange = $doc.Range($doc.Paragraphs.Item($projectsIndex).Range.End, $doc.Paragraphs.Item($skillsIndex).Range.Start)
  $insertRange.Text = (($projectLines -join "`r") + "`r")

  $projectsIndex = Find-ParagraphIndex $doc "PROJECTS"
  $skillsIndex = Find-ParagraphIndex $doc "TECHNICAL SKILLS"
  for ($i = $projectsIndex + 1; $i -lt $skillsIndex; $i++) {
    $paragraph = $doc.Paragraphs.Item($i)
    if ((($i - $projectsIndex) % 2) -eq 1) {
      $paragraph.Range.Style = $headingStyle
    } else {
      $paragraph.Range.Style = $normalStyle
    }
  }

  $layoutSteps = @(
    @{ Normal = 9.0; Heading = 9.5; TopBottom = 0.55; LeftRight = 0.5; HeadingAfter = 2 },
    @{ Normal = 8.5; Heading = 9.0; TopBottom = 0.45; LeftRight = 0.45; HeadingAfter = 1 },
    @{ Normal = 8.0; Heading = 8.5; TopBottom = 0.4; LeftRight = 0.4; HeadingAfter = 0 }
  )

  $pages = 99
  foreach ($step in $layoutSteps) {
    $doc.PageSetup.TopMargin = $word.InchesToPoints($step.TopBottom)
    $doc.PageSetup.BottomMargin = $word.InchesToPoints($step.TopBottom)
    $doc.PageSetup.LeftMargin = $word.InchesToPoints($step.LeftRight)
    $doc.PageSetup.RightMargin = $word.InchesToPoints($step.LeftRight)
    $normalStyle.Font.Size = $step.Normal
    $headingStyle.Font.Size = $step.Heading
    $headingStyle.ParagraphFormat.SpaceAfter = $step.HeadingAfter
    $doc.Repaginate()
    $pages = $doc.ComputeStatistics($wdStatisticPages)
    if ($pages -le 1) {
      break
    }
  }

  $doc.SaveAs([ref] $outputPath, [ref] $wdFormatXMLDocument)
  Write-Output "Updated: $outputPath"
  Write-Output "Pages: $pages"
}
finally {
  if ($doc -ne $null) {
    $doc.Close()
  }
  $word.Quit()
}
