import { useEffect, useState } from "react";
import { mockLists } from "../../mock-data";

export function AutoDeleteTodoList() {
  const [lists, setLists] = useState<any[]>(mockLists);
  // const [timeoutId, setTimeoutId] = useState<any>(null);

  // const handleReset = () => {
  //   if (lists.filter((v) => !v.moved).length < 11) {
  //     if (timeoutId) clearTimeout(timeoutId);

  //     const newTimeoutId = setTimeout(() => {
  //       lists.map((_, index: number) => {
  //         lists[index].moved = false;
  //       });

  //       setLists([...lists]);
  //     }, 5000);
  //     setTimeoutId(newTimeoutId);
  //   }
  // };

  const handleReset = (listProps: any, name: string) => {
    setTimeout(() => {
      const newLists: any = listProps;

      newLists.forEach((value: any, index: number) => {
        if (value.moved && value.name === name) {
          newLists[index].moved = false;
        }
      });
      setLists([...newLists]);
    }, 5000);
  };

  const handleMove = (name: string) => {
    const newLists = lists.filter((v) => !v.moved);
    const index = newLists.findIndex((v) => v.name === name);

    newLists[index].moved = true;
    setLists([...lists]);
    handleReset(lists, name);
  };

  const handleMoveBack = (name: string, type: string) => {
    const newLists = lists.filter((v: any) => v.moved && v.type === type);
    const index = newLists.findIndex((v) => v.name === name);

    newLists[index].moved = false;
    setLists([...lists]);
    // handleReset();
  };

  return (
    <div className="mt-16">
      <p className="text-lg mb-4">1. Auto Delete Todo List</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          {lists
            .filter((v: any) => !v.moved)
            .map((list: any, index: number) => {
              return (
                <button
                  key={index}
                  className="border py-2 mb-2 hover:bg-slate-100 max-h-[42px] block w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMove(list.name);
                  }}
                >
                  {list.name}
                </button>
              );
            })}
        </div>
        <div className="grid grid-cols-2 gap-2 col-span-2">
          <div className="border min-h-[350px] lg:min-h-[550px]">
            <div className="bg-slate-200 font-semibold text-center py-1">
              Fruit
            </div>

            <div className="grid pt-1">
              {lists
                .filter((v: any) => v.moved && v.type === "Fruit")
                .map((list: any, index: number) => {
                  return (
                    <button
                      key={index}
                      className="border py-2 my-1 mx-2 hover:bg-slate-100"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMoveBack(list.name, list.type);
                      }}
                    >
                      {list.name}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="border">
            <div className="bg-slate-200 font-semibold text-center py-1">
              Vegetable
            </div>

            <div className="grid pt-1">
              {lists
                .filter((v: any) => v.moved && v.type === "Vegetable")
                .map((list: any, index: number) => {
                  return (
                    <button
                      key={index}
                      className="border py-2 my-1 mx-2 hover:bg-slate-100"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMoveBack(list.name, list.type);
                      }}
                    >
                      {list.name}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
