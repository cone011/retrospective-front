import { Fragment, useEffect, useReducer, useState, useCallback } from "react";
import classes from "./SearchForm.module.css";
import { getAllTypesForSelect } from "../../../api/type";
import { getAllTypePost } from "../../../api/typePost";
import { todoReducer } from "../../Reducer/Reducer";
import {
  defaultTodoReducer,
  TYPE_REDUCER_ACTION,
  TYPE_MODAL,
} from "../../../utils/const";
import Layout from "../../UI/Layout/Layout";
import Card from "../../UI/Card/Card";
import SelectCheck from "react-select";

const SearchForm = (props) => {
  const { onReturnData } = props;
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const [dateBegin, setDateBegin] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [typePostSelected, setTypePostSelected] = useState([]);
  const [typeSelected, setTypeSelected] = useState([]);
  const [listType, setListType] = useState([]);
  const [listTypePost, setListTypePost] = useState([]);

  const assigmentValues = useCallback(async () => {
    try {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_LOADING,
        message: "Please wait for the data",
        typeModal: TYPE_MODAL.LOADING,
      });
      const resultType = await getAllTypesForSelect();
      setListType(resultType);
      const resultTypePost = await getAllTypePost();
      setListTypePost(resultTypePost);
      dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
    }
  }, []);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const onTypePostHandler = (data) => {
    setTypePostSelected(data);
  };

  const onTypesHandler = (data) => {
    setTypeSelected(
      data.map((item) => {
        return item;
      })
    );
  };

  const onReturnSearchData = () => {
    const listTypeSelected = typeSelected.map((item) => {
      return item.value;
    });
    onReturnData({ typePost: typePostSelected, type: listTypeSelected });
  };

  return (
    <Fragment>
      <Layout>
        <Card>
          <form className={classes.form}>
            <div className={classes.control}>
              <label htmlFor="typePost">Type Post</label>
              <SelectCheck
                className={classes.checkBox}
                options={listTypePost}
                value={typePostSelected}
                onChange={onTypePostHandler}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="typePost">Type Post</label>
              <SelectCheck
                className={classes.checkBox}
                isMulti
                value={typeSelected}
                options={listType}
                onChange={onTypesHandler}
              />
            </div>
            <div className={classes.action}>
              <button
                className="btn"
                type="button"
                onClick={onReturnSearchData}
              >
                Search
              </button>
            </div>
          </form>
        </Card>
      </Layout>
    </Fragment>
  );
};

export default SearchForm;
