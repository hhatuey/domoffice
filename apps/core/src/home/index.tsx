import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";
import { Reducer, connect, reduxFeature } from "@xarc/react-redux";
import electrodePng from "../../static/electrode.png";
import { reduxReducers as homeReducers } from "./reducers";
import { message } from "./message";
import { configureStore } from "@reduxjs/toolkit";

export const Demo1 = createDynamicComponent(
  {
    name: "demo1",
    getModule: () => import("../demo1"),
  },
  { ssr: true },
);

const incNumber = () => {
  return {
    type: "INC_NUMBER",
  };
};

const decNumber = () => {
  return {
    type: "DEC_NUMBER",
  };
};

const Home = (props) => {
  const { value, dispatch } = props;
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        <a href="https://www.electrode.io">
          Electrode <img src={electrodePng} />
        </a>
      </h1>
      <p>{message}</p>
      <p>props: {JSON.stringify(props)}</p>
      <h2>subapp Home with Redux</h2>
      Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
      &nbsp;{value}&nbsp;
      <button onClick={() => dispatch(incNumber())}>&#8811;</button>
      <h1>Demo1 subapp as a dynamic component in Home</h1>
      <Demo1 />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { value: state.home.value };
};
export const reduxReducers = { ...homeReducers };
export const subapp: ReactSubApp = {
  Component: connect(mapStateToProps, (dispatch) => ({ dispatch }))(Home),
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true, // true => read the reduxReducers export from this file
      prepare: async (initialState) => {
        return { initialState: initialState || { home: { value: 999 } } };
      },
      decorators: [
        {
          decorate(feat, params) {
            const store = configureStore({ reducer: params.reducers as Reducer });
            return { store };
          },
        },
      ],
    }),
  ],
};
