// import firebaseConfig from "@/firebaseConfig";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue, off } from "firebase/database";

// export const getData = () => {
//   const firebaseApp = initializeApp(firebaseConfig);
//   // Get a reference to the Firebase Realtime Database
//   const db = getDatabase(firebaseApp);
//   const dbRef = ref(db, "/data");

//   // Listen for changes to the data
//   const fetchData = () => {
//     let vals;
//     onValue(dbRef, (snapshot) => {
//       const val = snapshot.val();
//       vals = Object.values(val);
//       if (val) {
//         vals = (Object.values(val));
//       } else {
//         // Handle the case when snapshot.val() is null or undefined
//         console.error("Snapshot value is null or undefined.");
//       }
//     });
//     return vals ;
//   };

//   return fetchData();
//   return () => {
//     off(dbRef);
//   };
// };
