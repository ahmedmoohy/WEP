function register() {
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;

  if (password !== confirm) {
    alert('كلمة المرور غير متطابقة!');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // بعد إنشاء الحساب - نحفظ بيانات إضافية في Firestore
      return db.collection('users').doc(user.uid).set({
        username: username,
        email: email,
        createdAt: new Date()
      });
    })
    .then(() => {
      alert('تم إنشاء الحساب وتخزين البيانات!');
      window.location.href = 'login.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}
