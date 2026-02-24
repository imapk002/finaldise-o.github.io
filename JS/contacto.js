document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");

  const confirmModalEl = document.getElementById("confirmModal");
  const confirmModal = new bootstrap.Modal(confirmModalEl);
  const confirmarEnvioBtn = document.getElementById("confirmarEnvio");

  // efecto blur
  const blurOverlay = document.getElementById("blur-overlay");

  // validar campos
  [nombre, apellido].forEach((campo) => {
    campo.addEventListener("input", () => {
      campo.value = campo.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    });
  });

  // validar form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // tooltips previos
    const tooltipsActivos = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipsActivos.forEach(el => bootstrap.Tooltip.getInstance(el)?.dispose());

    if (!form.checkValidity()) {
      form.classList.add("was-validated");

      const invalidFields = form.querySelectorAll(":invalid");
      invalidFields.forEach((field) => {
        let message = "Campo inválido";

        if (field.validity.valueMissing) {
          message = "Este campo es obligatorio";
        } else if (field.validity.typeMismatch && field.type === "email") {
          message = "Debe ingresar un correo electrónico válido";
        }

        field.setAttribute("data-bs-toggle", "tooltip");
        field.setAttribute("data-bs-placement", "right");
        field.setAttribute("title", message);

        new bootstrap.Tooltip(field);
      });

      return;
    }

    
    confirmModal.show();
  });

  // abrir/cerrar modal con blur
 confirmModalEl.addEventListener("show.bs.modal", () => {
  blurOverlay.classList.add("active");
});

confirmModalEl.addEventListener("hidden.bs.modal", () => {
  blurOverlay.classList.remove("active");
});



  confirmarEnvioBtn.addEventListener("click", () => {
    confirmModal.hide();

    // Mensaje tipo Toast
    const toast = document.createElement("div");
    toast.className =
      "toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3 shadow-lg";
    toast.setAttribute("role", "alert");
    toast.innerHTML = `
      <div class="d-flex" tabindex="1060">
        <div class="toast-body">
          ¡Tu mensaje ha sido enviado correctamente!
        </div>
      </div>`;

    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // Reset form
    form.reset();
    form.classList.remove("was-validated");
  });
});
