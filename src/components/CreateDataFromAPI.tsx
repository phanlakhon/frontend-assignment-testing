import { useEffect, useRef, useState } from "react";

export function CreateDataFromAPI() {
  const isMounted = useRef(false);

  const [dataGroupByDepartment, setData] = useState<any>([]);

  const getData = async () => {
    const res = await fetch("https://dummyjson.com/users");
    const repo = await res.json();
    const { users } = repo;

    if (users) {
      let departmentAll: any = [];

      // find all department
      users.map((user: any) =>
        departmentAll.push(user?.company?.department || "-")
      );

      // group duplicate department
      const department = departmentAll.reduce(
        (accumulator: any, item: number) => {
          if (!accumulator.includes(item)) accumulator.push(item);

          return accumulator;
        },
        []
      );

      // maping data
      const newData: any = [];
      department.map((value: any, index: number) => {
        const userbyDepartment = users.filter(
          (user: any) => user?.company?.department === value
        );

        // get male
        const male: any = userbyDepartment.filter(
          (v: any) => v.gender === "male"
        );

        // get female
        const female: any = userbyDepartment.filter(
          (v: any) => v.gender === "female"
        );

        const age: any = [];
        const colors: any = [];
        const addressUser: any = {};
        userbyDepartment.map((v: any) => {
          age.push(v.age);
          colors.push(v.hair.color);

          // get addressUser
          addressUser[v.firstName + v.lastName] = v?.address?.postalCode || "-";
        });

        // get ageRange min and max
        const ageMin = Math.min(...age);
        const ageMax = Math.max(...age);

        // get hairColor
        const hairColor: any = {};
        colors.reduce((accumulator: any, item: number) => {
          if (!accumulator.includes(item)) {
            hairColor[item] = colors.filter((v: any) => v === item).length;
            accumulator.push(item);
          }

          return accumulator;
        }, []);

        // set data
        newData[index] = {
          [value]: {
            male: male.length,
            female: female.length,
            ageRange: ageMin === ageMax ? `${ageMin}` : `${ageMin}-${ageMax}`,
            hair: hairColor,
            addressUser,
          },
        };
      });

      setData([...newData]);
      console.log("Default data ->", users);
      console.log("Data Group By Department ->", newData);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      getData();
    }
  }, []);

  return (
    <div className="mt-16">
      <p className="text-lg">2. Create data from API (OPTIONAL)</p>

      <p className="text-sm">
        Github link:{" "}
        <a
          href="https://github.com/phanlakhon/frontend-assignment-testing"
          target="_blank"
          className="text-sky-600 hover:text-sky-400"
        >
          https://github.com/phanlakhon/frontend-assignment-testing
        </a>
      </p>
      <p className="text-red-500 text-sm mb-4">
        * มี Log data ไว้ใน Console ด้วยนะคะ inspect เพื่อดูได้เลยค่ะ
      </p>

      <pre>{JSON.stringify(dataGroupByDepartment, null, 2)}</pre>
    </div>
  );
}
