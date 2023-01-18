import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  MenuList,
  Select,
  TextField,
} from "@mui/material";
import "./QueryForm.css";
import { Controller } from "react-hook-form";

export default function QueryForm(props) {
  const [clause, setClause] = useState("");
  const [operator, setOperator] = useState("");
  const [name, setName] = useState("");
  const [allKey, setAllkey] = useState(true);


  const WhereClauseQuery = () => {
    return (
      <>
        <Controller
          control={props.control}
          name={`test.${props.index}.name`}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <FormControl sx={{ width: "150px", margin: "20px" }}>
              <InputLabel id="demo-simple-select-label">
                Document name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Document name"
                onChange={(event) => {
                  setAllkey(false);
                  setName(event.target.value);
                  onChange(event);
                }}
              >
                {MenuitemList1}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={props.control}
          name={`test.${props.index}.operator`}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <FormControl sx={{ width: "150px", margin: "20px" }}>
              <InputLabel id="demo-simple-select-label">
                Select operator
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Select operator"
                onChange={(event) => {
                  setOperator(event.target.value);
                  onChange(event)
                }}
              >
                <MenuItem value={`equal`}>{`==`}</MenuItem>
                <MenuItem value={`not-equal`}>{`!=`}</MenuItem>
                <MenuItem value={`greater-than`}>{`>`}</MenuItem>
                <MenuItem value={`lesser-than`}>{`<`}</MenuItem>
                <MenuItem value={`greater-than-or-equal`}>{`>=`}</MenuItem>
                <MenuItem value={`lesser-than-or-equal`}>{`<=`}</MenuItem>
                <MenuItem value={`IN`}>{"IN"}</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        {operator === "IN" ? (
              <FormGroup>
                {MenuitemList3}
              </FormGroup>
        ) : ((((operator === "equal") || (operator === "not-equal") || (operator === "greater-than") || (operator === "lesser-than") || (operator === "greater-than-or-equal") || (operator === "lesser-than-or-equal")) ?
          <Controller
            control={props.control}
            name={`test.${props.index}.key`}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <FormControl sx={{ width: "150px", margin: "20px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a value
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="Select a key"
                  onChange={onChange}
                >
                  {MenuitemList2}
                </Select>
              </FormControl>
            )}
          /> : <> </>
          )
        )
        }
      </>
    );
  };

  const OrderByClauseQuery = () => {
    return (
      <>
        <Controller
          control={props.control}
          name={`test.${props.index}.name`}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <FormControl sx={{ width: "150px", margin: "20px" }}>
              <InputLabel id="demo-simple-select-label">
                Document name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Document name"
                onChange={(e)=>{
                    setName(e.target.value);
                    onChange(e)}
                }
              >
                {MenuitemList1}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={props.control}
          name={`test.${props.index}.order`}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <FormControl sx={{ width: "150px", margin: "20px" }}>
              <InputLabel id="demo-simple-select-label">
                Select order type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Select order type"
                onChange={onChange}
              >
                <MenuItem value={"ascending"}>{"ascending"}</MenuItem>
                <MenuItem value={"descending"}>{"descending"}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </>
    );
  };

  const LimitClauseQuery = () => {
    return (
      <>
        <Controller
          control={props.control}
          name={`test.${props.index}.limit`}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <FormControl sx={{ width: "150px", margin: "20px" }}>
              <TextField
                id="outlined-multiline-flexible"
                type="number"
                value={value}
                onChange={onChange}
              />
            </FormControl>
          )}
        />
      </>
    );
  };

  const SelectedQuery = (propss) => {
    switch (propss.clauseType) {
      case "WHERE":
        return <WhereClauseQuery />;
      case "ORDER BY":
        return <OrderByClauseQuery />;
      case "LIMIT":
        return <LimitClauseQuery />;
      case "COUNT":
        return <></>;
      default:
        return <></>;
    }
  };

  let MenuitemList1 = [];
  Object.keys(props.keys).forEach((key1) => {
    MenuitemList1.push(<MenuItem value={key1}>{key1}</MenuItem>);
  });

  let MenuitemList2 = [];
  let values = [];
  if (allKey) {
    Object.keys(props.keys).forEach((key2) => {
      values = [...values, ...props.keys[key2]];
    });
  } else {
    values = props.keys[name];
  }

  values.forEach((value, index) => {
    MenuitemList2.push(<MenuItem value={value}>{value}</MenuItem>);
  });

  let MenuitemList3 = [];
  values.forEach((val, index) => {
    MenuitemList3.push(
        <Controller
        control={props.control}
        name={`test.${props.index}.inValue.${index}`}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
      <FormControlLabel control={<Checkbox onChange={(e)=>{
        onChange(e.target.value)}}/>} label={val} value={val} />
      )}
      />
    );
  });

  return (
    <div className="QueryForm">
      <Controller
        control={props.control}
        // key={props.item}
        name={`test.${props.index}.clause`}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <FormControl sx={{ width: "150px", margin: "20px" }}>
            <InputLabel id="demo-simple-select-label">
              Select a caluse
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Select a clause"
              onChange={(event) => {
                if (props.selectLimit === true && event.target.value === "LIMIT") {
                    setClause("LIMIT");
                    props.setSelectLimit(!props.selectLimit);
                }
                else{
                    setClause(event.target.value);
                }
                onChange(event.target.value)
                console.log(clause);
              }}
            >
              <MenuList value="WHERE">WHERE</MenuList>
              <MenuList value="ORDER BY">ORDER BY</MenuList>
              {props.selectLimit === true ? (
                <MenuList value="LIMIT">LIMIT</MenuList>
              ) : (
                <></>
              )}
              <MenuList value="COUNT">COUNT</MenuList>
            </Select>
          </FormControl>
        )}
      />

      <SelectedQuery clauseType={clause} />

      <DeleteIcon
        color="primary"
        sx={{ fontSize: "50px" }}
        onClick={() => {
            console.log(props.index);
            if (!props.selectLimit === true) {
                props.setSelectLimit(!props.selectLimit);
            }
            props.remove(props.index);
        }}
      />
    </div>
  );
}
