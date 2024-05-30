"use client";

import firebaseConfig from "@/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";

import { DataTable, DataTableValueArray } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Table from "@/components/Table";
import BasicFilterDemo from "@
// test

export default function Home() {
  const [data, setData] = useState<DataTableValueArray | undefined>();

  useEffect(() => {
    // Initialize Firebase app

    const firebaseApp = initializeApp(firebaseConfig);

    // Get a reference to the Firebase Realtime Database
    const db = getDatabase(firebaseApp);
    const dbRef = ref(db, "/data");

    // Listen for changes to the data
    const fetchData = () => {
      onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (val) {
          setData(Object.values(val));

          console.log(Object.values(val));
        } else {
          // Handle the case when snapshot.val() is null or undefined
          console.error("Snapshot value is null or undefined.");
        }
      });
    };

    fetchData();
    // Cleanup function to remove the listener when the component unmounts
    return () => {
      off(dbRef);
    };
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <h1 className="font-mono text-xl text-green-500"></h1>
      <div className="card">
        <Table data={data} />
      </div>
    </div>
  );
}
