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
    <div className="my-16">
      <p className="text-lg">2. Create data from API (OPTIONAL)</p>
      <p className="text-red-500 mb-4 text-sm">
        * Log Array ไว้ใน Console แล้วนะคะ inspect เพื่อดูได้เลยค่ะ
      </p>

      <div className="text-sm">
        <ul>
          {dataGroupByDepartment &&
            dataGroupByDepartment.map((item: any, index: number) => {
              let department = "";
              let value: any = {};
              Object.keys(item).map((key) => {
                department = key;
                value = item[key];
              });

              const hair: any = [];
              Object.keys(value.hair).map((key: any, index: number) => {
                hair[index] = { color: key, amount: value.hair[key] };
              });

              const addressUser: any = [];
              Object.keys(value.addressUser).map((key: any, index: number) => {
                addressUser[index] = {
                  name: key,
                  postalCode: value.addressUser[key],
                };
              });

              return (
                <li key={index} className="mb-2">
                  <p className="font-medium text-md">
                    {index + 1}. [{department}]:
                  </p>
                  <p className="ml-4">
                    <span className="font-medium">male:</span> {value.male}
                  </p>
                  <p className="ml-4">
                    <span className="font-medium">female:</span> {value.female}
                  </p>
                  <p className="ml-4">
                    <span className="font-medium">ageRange:</span>{" "}
                    {value.ageRange}
                  </p>

                  {hair && (
                    <div className="ml-4">
                      <p className="font-medium">hair:</p>
                      {hair.map((item2: any, index2: number) => (
                        <p className="ml-4" key={index2}>
                          {item2.color}: {item2.amount}
                        </p>
                      ))}
                    </div>
                  )}

                  {addressUser && (
                    <div className="ml-4">
                      <p className="font-medium">addressUser:</p>
                      {addressUser.map((item2: any, index2: number) => (
                        <p className="ml-4" key={index2}>
                          {item2.name}: {item2.postalCode}
                        </p>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
