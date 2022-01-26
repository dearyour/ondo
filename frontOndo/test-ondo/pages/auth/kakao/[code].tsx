import React from 'react';
import { useDispatch } from 'react-redux';
import useUser from "../../../store/hooks/userHooks"
import AppLayout from '../../../components/layout/AppLayout'

const Auth2 = () => {
  const {plus, count} = useUser()
  return (
    <div>
      <div>
            <AppLayout>
            </AppLayout>
            <h1>count</h1>
            <button onClick={() => plus()}> + </button>


        </div>
    </div>
  )
};
export default Auth2;