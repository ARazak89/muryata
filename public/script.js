document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.form-section');
    let currentSectionIndex = 0;

    sections[currentSectionIndex].classList.add('active');

    const updateSectionVisibility = () => {
        sections.forEach((section, index) => {
            section.classList.toggle('active', index === currentSectionIndex);
        });
    };

    const validateSection = (section) => {
        const inputs = section.querySelectorAll('input, textarea');
        for (const input of inputs) {
            if (!input.value.trim()) {
                return false;
            }
        }
        return true;
    };

    document.querySelectorAll('.next-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (validateSection(sections[currentSectionIndex])) {
                currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
                updateSectionVisibility();
            } else {
                alert('Veuillez remplir tous les champs.');
            }
        });
    });

    document.querySelectorAll('.prev-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
            updateSectionVisibility();
        });
    });
});



document.getElementById('reflexionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('/send-email', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Les réponses ont été envoyées avec succès.');
            this.reset(); // Reset the form after successful submission
            currentSectionIndex = 0; // Reset to the first section
            updateSectionVisibility();
        } else {
            alert('Une erreur s\'est produite lors de l\'envoi des réponses.');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors de l\'envoi des réponses.');
    });
});