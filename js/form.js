(() => {
  const forms = Array.from(document.querySelectorAll("[data-enquiry-form]"));
  if (!forms.length) return;

  const isPhoneValid = (v) => /^[6-9]\d{9}$/.test(String(v || "").trim());
  const isEmailValid = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());

  const setError = (fieldEl, msg) => {
    const control = fieldEl.querySelector(".control");
    const err = fieldEl.querySelector("[data-error]");
    if (control instanceof HTMLElement) control.classList.add("is-invalid");
    if (err) err.textContent = msg || "";
  };

  const clearError = (fieldEl) => {
    const control = fieldEl.querySelector(".control");
    const err = fieldEl.querySelector("[data-error]");
    if (control instanceof HTMLElement) control.classList.remove("is-invalid");
    if (err) err.textContent = "";
  };

  const validate = (form) => {
    let ok = true;
    const required = Array.from(form.querySelectorAll("[data-required]"));

    required.forEach((field) => {
      if (!(field instanceof HTMLElement)) return;
      const control = field.querySelector(".control");
      const val =
        control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement
          ? control.value.trim()
          : "";

      clearError(field);
      if (!val) {
        setError(field, "This field is required.");
        ok = false;
      }
    });

    const phoneField = form.querySelector("[data-phone-field]");
    if (phoneField instanceof HTMLElement) {
      const control = phoneField.querySelector(".control");
      const val = control instanceof HTMLInputElement ? control.value.trim() : "";
      clearError(phoneField);
      if (!isPhoneValid(val)) {
        setError(phoneField, "Enter a valid 10-digit Indian phone number.");
        ok = false;
      }
    }

    const emailField = form.querySelector("[data-email-field]");
    if (emailField instanceof HTMLElement) {
      const control = emailField.querySelector(".control");
      const val = control instanceof HTMLInputElement ? control.value.trim() : "";
      clearError(emailField);
      if (!isEmailValid(val)) {
        setError(emailField, "Enter a valid email address.");
        ok = false;
      }
    }

    return ok;
  };

  const setLoading = (form, loading) => {
    const btn = form.querySelector("[data-submit]");
    if (!(btn instanceof HTMLButtonElement)) return;
    btn.disabled = loading;
    btn.setAttribute("aria-busy", loading ? "true" : "false");
    const spin = btn.querySelector("[data-spinner]");
    if (spin) spin.style.display = loading ? "inline-block" : "none";
  };

  const showStatus = (form, msg, ok = true) => {
    const box = form.querySelector("[data-status]");
    if (!(box instanceof HTMLElement)) return;
    box.classList.add("is-show");
    box.style.borderColor = ok ? "rgba(245,168,0,0.35)" : "rgba(211,47,47,0.55)";
    box.textContent = msg;
  };

  forms.forEach((form) => {
    form.addEventListener("input", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      const field = t.closest("[data-field]");
      if (field instanceof HTMLElement) clearError(field);
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!(form instanceof HTMLFormElement)) return;

      const ok = validate(form);
      if (!ok) {
        showStatus(form, "Please fix the highlighted fields and try again.", false);
        return;
      }

      setLoading(form, true);
      showStatus(form, "Submitting your enquiry…", true);

      // If user configured Formspree action, try POST; otherwise fallback to mailto
      const action = form.getAttribute("action") || "";
      const hasFormspree = /formspree\.io\/f\//i.test(action);

      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());

      try {
        if (hasFormspree) {
          const res = await fetch(action, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: fd,
          });
          if (!res.ok) throw new Error("Request failed");
        } else {
          const subject = encodeURIComponent("Jadoun Maths Academy — Admission Enquiry");
          const body = encodeURIComponent(
            Object.entries(payload)
              .map(([k, v]) => `${k}: ${v}`)
              .join("\n")
          );
          window.location.href = `mailto:jadounmathsacademy@gmail.com?subject=${subject}&body=${body}`;
        }

        form.reset();
        showStatus(form, "✅ Thank you! We'll contact you within 24 hours.", true);
      } catch {
        showStatus(form, "Something went wrong. Please call +91 84353 73222 or try again.", false);
      } finally {
        setLoading(form, false);
      }
    });
  });
})();

