import { useEffect, useRef, useState } from "react";
import type { User } from "./types/API";

import "./App.css";

import { getAdminData } from "./api/admin";
import { SelectableTable } from "./components/table/table";

const URL = "./members.json";
// const URL = import.meta.env.VITE_USERS_API;

function App() {
  const dataRef = useRef<User[]>();

  const [data, setData] = useState<User[]>();
  const [isEditable, setIsEditable] = useState<string>("");

  useEffect(() => {
    getAdminData<User[]>(URL).then((data) => {
      setData(data);
      dataRef.current = data;
    });
  }, []);

  const columns = [
    {
      Header: "Email",
      accessor: "email",
      Cell: ({ props }: { props: any }) => {
        return (
          <>
            {isEditable === props.id ? (
              <input
                type="text"
                defaultValue={props.email}
                className="bg-neutral-700 px-2 py-1 rounded-sm"
                onChange={(e) => {
                  const newData = dataRef.current?.map((item) => {
                    if (item.id === props.id) {
                      return { ...item, email: e.target.value };
                    }
                    return item;
                  });
                  dataRef.current = newData;
                }}
              />
            ) : (
              props.email
            )}
          </>
        );
      },
    },
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ props }: { props: any }) => {
        return (
          <>
            {isEditable === props.id ? (
              <input
                type="text"
                defaultValue={props.name}
                className="bg-neutral-700 px-2 py-1 rounded-sm"
                onChange={(e) => {
                  const newData = dataRef.current?.map((item) => {
                    if (item.id === props.id) {
                      return { ...item, name: e.target.value };
                    }
                    return item;
                  });
                  dataRef.current = newData;
                }}
              />
            ) : (
              props.name
            )}
          </>
        );
      },
    },
    { Header: "Role", accessor: "role" },
    {
      Header: "Actions",
      accessor: "id",
      Cell: ({ props }: { props: any }) => {
        return (
          <div className="flex gap-4 items-center">
            {isEditable.length === 0 ? (
              <button onClick={() => setIsEditable(props.id)}>✏️</button>
            ) : (
              isEditable === props.id && (
                <button
                  onClick={() => {
                    setIsEditable("");
                    console.log(dataRef.current);
                    setData(dataRef.current);
                  }}
                >
                  ✔️
                </button>
              )
            )}
            <button
              onClick={() => {
                setData((prev) => {
                  return prev?.filter((item) => item.id !== props.id);
                });
              }}
            >
              🗑️
            </button>
          </div>
        );
      },
    },
  ];

  if (!data) return <>loading...</>;

  return (
    <main>
      <section>
        <SelectableTable
          columns={columns}
          data={data}
          rowsPerPage={10}
          handleData={setData}
        />
      </section>
    </main>
  );
}

export default App;
