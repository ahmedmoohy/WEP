// تهيئة Firebase للـ Browser العادي
const firebaseConfig = {
  apiKey: "AIzaSyASA2SUjwfV4zLe122-Bt54Td5xTmRzZ7Q",
  authDomain: "edu-project-44337.firebaseapp.com",
  projectId: "edu-project-44337",
  storageBucket: "edu-project-44337.appspot.com",
  messagingSenderId: "47084279564",
  appId: "1:47084279564:web:777d7b778b99a7b4e99b29",
  measurementId: "G-RTXZHGB10P"
};

// Initialize
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
firebase.analytics();

// دالة إنشاء الحساب
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
      // إضافة بيانات Firestore
      return db.collection('users').doc(user.uid).set({
        username: username,
        email: email,
        createdAt: new Date()
      });
    })
    .then(() => {
      alert('تم إنشاء الحساب والدخول!');
      window.location.href = 'dashboard.html'; // يدخل مباشرة
    })
    .catch((error) => {
      alert(error.message);
    });
}

// دالة تسجيل الدخول
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert('تم تسجيل الدخول!');
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}

// تحقق من حالة تسجيل الدخول في الداشبورد
function checkAuthAndLoadDashboard() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // جلب بيانات المستخدم
      db.collection('users').doc(user.uid).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          document.getElementById('welcome').innerText = `مرحبًا ${data.username}!`;
        } else {
          document.getElementById('welcome').innerText = 'مرحبًا!';
        }
      });
    } else {
      // لو مش مسجل دخول يرجع للّوجين
      window.location.href = 'login.html';
    }
  });
}
