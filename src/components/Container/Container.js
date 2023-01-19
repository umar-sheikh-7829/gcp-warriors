import React, { useState } from "react";
import QueryForm from "../QueryForm/QueryForm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Container.css";
import { Button } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useFieldArray, useForm } from "react-hook-form";
import { BreakfastDining } from "@mui/icons-material";

export default function Container() {
  const [selectLimit, setSelectLimit] = useState(true);
  const [selectCount, setSelectCount] = useState(true);
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const keys = {
    inst: ["infosys", "wipro"],
    org: ["bank", "finance"],
    quality: ["high", "low", "medium"],
  };

  return (
    <div className="container">
      <form
        onSubmit={ handleSubmit((data) => {
          console.log(data);
          let result = [];
          let keys = {};
          data.test.map((i)=>{
            switch(i["clause"]){
              case "WHERE" :
                keys["WHERE"] = ["clause", "name", "operator", "key"]
                break;
              case "LIMIT" :
                keys["LIMIT"] = ["clause", "limit"]
                break;
              case "ORDER BY":
                keys["ORDER BY"] = ["clause", "name", "order"]
                break;
              case "COUNT":
                keys["COUNT"] = ["clause"]
                break;
              default:
                break;
            }
            let resultI = {}; 
              for(let j in i){
                if((typeof i[j] === 'string' || i[j] instanceof String) && keys[i["clause"]].includes(j)){
                  resultI[j] = i[j];
                }
                else if(typeof i[j] === 'object' || i[j] instanceof Object){
                  let resultII = []; 
                  i[j].map((k)=>{
                    if(typeof k === 'string' || i[j] instanceof String){
                      resultII.push(k);
                    }
                  })
                  resultI[j] = resultII; 
                }
              }
              result.push(resultI)
            })
            console.log(result);
        })
      }
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {fields.map((item, index) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "2px solid #0c66d3",
                borderRadius: "25px",
                padding: "10px",
                margin: "10px",
              }}
            >
              <QueryForm
                keys={keys}
                selectLimit={selectLimit}
                setSelectLimit={setSelectLimit}
                selectCount={selectCount}
                setSelectCount={setSelectCount}
                index={index}
                queryLength={fields.length}
                remove={remove}
                register={register}
                control={control}
                length={fields.length}
              />
            </div>
          );
        })}
        <AddCircleIcon
          color="primary"
          sx={{ fontSize: "50px" }}
          onClick={() => append({})}
        />
        <Button variant="contained" type="submit" sx={{ m: "10px" }}>
          <PlayCircleIcon /> <span className="runButton">Run All</span>{" "}
        </Button>
      </form>
    </div>
  );
}
