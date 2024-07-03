"use client";

import firebaseConfig from "@/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";

import { DataTableValueArray } from "primereact/datatable";
import Table from "@/components/Table";

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
          const dataToUpdate = Object.values(val);
          const updatedData = dataToUpdate.map((item: any) => {
            if (item.Location && item["City, State"]) {
              item.Location = `${item.Location}, ${item["City, State"]}`;
            } else if (item["City, State"]) {
              item.Location = item["City, State"];
            } else {
              item.Location = "Online";
            }
            return item;
          });
          setData(updatedData);
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
