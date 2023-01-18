import React, { useState } from "react";
import QueryForm from "../QueryForm/QueryForm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Container.css";
import { Button } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useFieldArray, useForm } from "react-hook-form";

export default function Container() {
  const [selectLimit, setSelectLimit] = useState(true);
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
          const result = [];
          data.test.map((i)=>{
          let resultI = {}; 
            for(let j in i){
              if(typeof i[j] === 'string' || i[j] instanceof String){
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
                index={index}
                queryLength={fields.length}
                remove={remove}
                register={register}
                control={control}
                // item={item.id}
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
