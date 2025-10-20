document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const fields = ['fullname', 'email', 'password', 'confirm-password'];

  function clearErrors(){
    document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
    document.querySelectorAll('.input-group input').forEach(input => {
      input.classList.remove('input-error');
    });
  }

  function validateField(id, value){
    switch(id){
      case 'fullname':
        if (value.trim().length < 3) return 'Nome deve ter ao menos 3 caracteres!';
        break;
      case 'email':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'E-mail inválido!';
        break;
      case 'password':
        if (value.length < 8) return 'Senha deve ter pelo menos 8 caracteres!';
        if (value.length > 32) return 'Senha deve ter no máximo 32 caracteres!';
        if (/\s/.test(value)) return 'A senha não pode conter espaços';
        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPassword.test(value)) {
          return 'A senha deve incluir maiúscula, minúscula, número e caractere especial.';
        }
      case 'confirm-password':
        const password = document.getElementById('password').value;
        if (value !== password) return 'As senhas não coincidem!';
        break;
    }
    return ''
  }

  form.addEventListener('submit', function(event){
    event.preventDefault();
    clearErrors();

    let isValid = true;

    fields.forEach(id => {
      const input = document.getElementById(id);
      const msg = validateField(id, input.value);
      const errorSpan = input.parentElement.querySelector('.error-message');

      if (msg){
        errorSpan.textContent = msg;
        input.classList.add('input-error');

        isValid = false;
      }
    });

    if (isValid){
      form.submit();
    }
  });
});