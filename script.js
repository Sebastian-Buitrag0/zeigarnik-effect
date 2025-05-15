document.addEventListener('DOMContentLoaded', function() {
    const taskListElement = document.getElementById('taskList');
    const initialTasks = [
        { id: 'task1', name: 'Leer el capítulo 1 del libro', progress: 100, statusText: 'Completada' },
        { id: 'task2', name: 'Escribir el informe semanal', progress: 60, statusText: 'En progreso...' },
        { id: 'task3', name: 'Responder correos electrónicos', progress: 100, statusText: 'Completada' },
        { id: 'task4', name: 'Planificar la reunión del proyecto', progress: 30, statusText: 'Pendiente...' },
        { id: 'task5', name: 'Comprar víveres', progress: 100, statusText: 'Completada' },
        { id: 'task6', name: 'Hacer ejercicio', progress: 0, statusText: 'No iniciada' },
        { id: 'task7', name: 'Llamar al cliente X', progress: 85, statusText: 'Casi lista!' }
    ];

    // Hacemos una copia para poder modificar el progreso
    let tasks = JSON.parse(JSON.stringify(initialTasks));

    function renderTasks() {
        taskListElement.innerHTML = ''; // Limpiar lista actual

        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            listItem.dataset.taskId = task.id;

            const taskName = document.createElement('span');
            taskName.textContent = task.name;

            const taskStatusContainer = document.createElement('div');
            taskStatusContainer.style.display = 'flex';
            taskStatusContainer.style.alignItems = 'center';

            const statusSpan = document.createElement('span');
            statusSpan.classList.add('status');
            statusSpan.textContent = task.statusText;

            taskStatusContainer.appendChild(statusSpan);

            if (task.progress < 100) {
                listItem.classList.add('incomplete');
                const progressBarContainer = document.createElement('div');
                progressBarContainer.classList.add('progress-bar-container');
                const progressBar = document.createElement('div');
                progressBar.classList.add('progress-bar');
                progressBar.style.width = task.progress + '%';
                progressBarContainer.appendChild(progressBar);
                taskStatusContainer.appendChild(progressBarContainer);

                // Añadir evento de clic solo a tareas incompletas
                listItem.addEventListener('click', () => handleTaskClick(task.id));
            } else {
                listItem.classList.add('complete');
            }

            listItem.appendChild(taskName);
            listItem.appendChild(taskStatusContainer);
            taskListElement.appendChild(listItem);
        });
    }

    function handleTaskClick(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task && task.progress < 100) {
            task.progress += 20; // Aumentar progreso en 20%
            if (task.progress > 100) {
                task.progress = 100;
            }

            if (task.progress === 100) {
                task.statusText = 'Completada';
            } else if (task.progress > 0) {
                task.statusText = 'En progreso...';
            } else {
                task.statusText = 'No iniciada';
            }
            renderTasks(); // Volver a dibujar las tareas para reflejar cambios
        }
    }

    renderTasks(); // Dibujar tareas iniciales

    // Interactividad para Ejemplo 1: Barra de Progreso de Perfil
    const profileProgressBar = document.getElementById('profileProgressBar');
    const incrementProfileBtn = document.getElementById('incrementProfileBtn');
    const profileCompleteMessage = document.getElementById('profileCompleteMessage');
    let currentProfileProgress = 65;

    if (incrementProfileBtn) {
        incrementProfileBtn.addEventListener('click', () => {
            if (currentProfileProgress < 100) {
                currentProfileProgress += 10;
                if (currentProfileProgress > 100) {
                    currentProfileProgress = 100;
                }
                profileProgressBar.style.width = currentProfileProgress + '%';
                profileProgressBar.textContent = currentProfileProgress + '% Completo';

                if (currentProfileProgress === 100) {
                    incrementProfileBtn.style.display = 'none';
                    profileCompleteMessage.style.display = 'block';
                }
            }
        });
    }

    // Interactividad para Ejemplo 2: Proceso de Compra en Pasos
    const purchaseStepper = document.getElementById('purchaseStepper');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    
    if (purchaseStepper) {
        const steps = purchaseStepper.querySelectorAll('.step');
        let currentStep = 1;
        const totalSteps = steps.length;

        function updateStepper() {
            steps.forEach(step => {
                const stepNumber = parseInt(step.dataset.step);
                step.classList.remove('active', 'completed');
                if (stepNumber < currentStep) {
                    step.classList.add('completed');
                } else if (stepNumber === currentStep) {
                    step.classList.add('active');
                }
            });
            prevStepBtn.disabled = currentStep === 1;
            nextStepBtn.disabled = currentStep === totalSteps;
        }

        if (nextStepBtn) {
            nextStepBtn.addEventListener('click', () => {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateStepper();
                }
            });
        }

        if (prevStepBtn) {
            prevStepBtn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateStepper();
                }
            });
        }
        // Inicializar stepper
        updateStepper();
    }
});
