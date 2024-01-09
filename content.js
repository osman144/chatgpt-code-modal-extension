function createModal(codeBlockContainer) {
    // Create the modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'customModalOverlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    // Create the modal container
    const modal = document.createElement('div');
    modal.id = 'customModal';
    modal.style.cssText = `
        background-color: white;
        padding: 0; // Remove padding to avoid white space
        border-radius: 16px;
        width: 90vw;
        max-height: 90vh;
        overflow: auto;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 1001;
    `;

    const clonedCodeBlockContainer = codeBlockContainer.cloneNode(true);

    const openModalButton = clonedCodeBlockContainer.querySelector('.custom-modal-button');
    if (openModalButton) {
        openModalButton.style.display = 'none'; // Hide the button instead of removing it to maintain layout
    }

    // Hide the span containing the "Copy Code" button
    const copyCodeSpan = clonedCodeBlockContainer.querySelector('span[data-state="closed"]');
    if (copyCodeSpan) {
        copyCodeSpan.style.display = 'none';
    }


    modal.appendChild(clonedCodeBlockContainer);

    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    modal.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}


function addModalButtonNextToCopyButton() {
    const codeBlockContainers = document.querySelectorAll('.bg-black.rounded-md .flex.items-center');

    codeBlockContainers.forEach(codeBlockContainer => {
        if (!codeBlockContainer.querySelector('.custom-modal-button')) {
            const languageSpan = codeBlockContainer.querySelector('span:first-child');

            if (languageSpan) {
                const newSpan = document.createElement('span');
                newSpan.style.marginRight = '10px'; 

                const newButton = document.createElement('button');
                newButton.textContent = 'Open Modal';
                newButton.className = 'flex gap-1 items-center custom-modal-button';
                newSpan.appendChild(newButton);

                newButton.addEventListener('click', function() {
                    createModal(codeBlockContainer.closest('.bg-black.rounded-md'));
                });

                languageSpan.parentNode.insertBefore(newSpan, languageSpan.nextSibling);
            }
        }
    });
}


addModalButtonNextToCopyButton();

const observer = new MutationObserver(function(mutations) {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
            addModalButtonNextToCopyButton();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});