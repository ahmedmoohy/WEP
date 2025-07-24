// تهيئة Firebase في صفحات HTML عادية

// الكود ده هيشتغل مع ملفات HTML اللي فيها:
// <script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js"></script>

// 1️⃣ التهيئة
const firebaseConfig = {
  apiKey: "AIzaSyASA2SUjwfV4zLe122-Bt54Td5xTmRzZ7Q",
  authDomain: "edu-project-44337.firebaseapp.com",
  projectId: "edu-project-44337",
  storageBucket: "edu-project-44337.appspot.com",
  messagingSenderId: "47084279564",
  appId: "1:47084279564:web:777d7b778b99a7b4e99b29",
  measurementId: "G-RTXZHGB10P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

// 2️⃣ الدوال
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

      // إضافة بيانات المستخدم في Firestore
      return db.collection('users').doc(user.uid).set({
        username: username,
        email: email,
        createdAt: new Date()
      });
    })
    .then(() => {
      alert('تم إنشاء الحساب بنجاح!');
      window.location.href = 'login.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('تم تسجيل الدخول بنجاح!');
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}
