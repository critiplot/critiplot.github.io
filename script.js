  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-arrow.prev');
  const nextButton = document.querySelector('.carousel-arrow.next');
  
  let index = 0;

  function moveCarousel(direction) {
    if (direction === 'next') {
      index++;
      if (index >= slides.length) index = 0;
    } else {
      index--;
      if (index < 0) index = slides.length - 1;
    }
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevButton.addEventListener('click', () => moveCarousel('prev'));
  nextButton.addEventListener('click', () => moveCarousel('next'));
  
  const citations = {
    apa: "Sahu, V. (2025). Critiplot: A Critical Appraisal Plot Visualiser for Risk of Bias in Systematic Reviews and Meta-Analyses (v2.1.1). Zenodo. https://doi.org/10.5281/zenodo.17236600",
    vancouver: "Sahu V. Critiplot: A Critical Appraisal Plot Visualiser for Risk of Bias in Systematic Reviews and Meta-Analyses (v2.1.1). Zenodo; 2025. Available from: https://doi.org/10.5281/zenodo.17236600",
    chicago: "Sahu, V. 2025. Critiplot: A Critical Appraisal Plot Visualiser for Risk of Bias in Systematic Reviews and Meta-Analyses (v2.1.1). Zenodo. https://doi.org/10.5281/zenodo.17236600",
    harvard: "Sahu, V., 2025. Critiplot: A Critical Appraisal Plot Visualiser for Risk of Bias in Systematic Reviews and Meta-Analyses (v2.1.1). Zenodo. Available at: https://doi.org/10.5281/zenodo.17236600",
    mla: "Sahu, Vihaan. \"Critiplot: A Critical Appraisal Plot Visualiser for Risk of Bias in Systematic Reviews and Meta-Analyses (v2.1.1).\" 2025, Zenodo, https://doi.org/10.5281/zenodo.17236600.",
    ieee: "V. Sahu, \"Critiplot: A Critical Appraisal Plot Visualiser for Risk of Bias in Systematic Reviews and Meta-Analyses (v2.1.1),\" Zenodo, 2025. doi: 10.5281/zenodo.17236600."
  };

  const citationSelect = document.getElementById("citationType");
  const citationText = document.getElementById("citationText");
  const copyButton = document.getElementById("copyButton");

  citationSelect.addEventListener("change", () => {
    const selected = citationSelect.value;
    citationText.innerHTML = "<em>" + citations[selected] + "</em>";
  });

  function copyCitation() {
    navigator.clipboard.writeText(citationText.innerText).then(() => {
      const originalText = copyButton.innerHTML;
      copyButton.innerHTML = "<i class='fas fa-check'></i> Copied!";
      
      setTimeout(() => {
        copyButton.innerHTML = originalText;
      }, 2000);
    });
  }
  
  copyButton.addEventListener("click", copyCitation);
  
  function downloadCitation(format) {
    let content = "";
    let filename = "critiplot_citation";
    
    if (format === 'ris') {
      content = `TY  - COMP
T1  - Critiplot: A Critical Appraisal Plot Visualiser for Risk of Bias in Systematic Reviews and Meta-Analyses
A1  - Sahu, Vihaan
Y1  - 2025
DO  - https://doi.org/10.5281/zenodo.17236600
PB  - Zenodo
PY  - 2025
ER  - `;
      filename += ".ris";
    } else if (format === 'bibtex') {
      content = `@software{critiplot,
  author = {Sahu, Vihaan},
  title = {{Critiplot: A Critical Appraisal Plot Visualiser for Risk of Bias in Systematic Reviews and Meta-Analyses}},
  year = {2025},
  version = {v2.1.1},
  publisher = {Zenodo},
  doi = {10.5281/zenodo.17236600},
  url = {https://doi.org/10.5281/zenodo.17236600}
}`;
      filename += ".bib";
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }