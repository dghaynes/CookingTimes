import {describe, it} from 'vitest';
import {render} from '@testing-library/react';
import App from './App.jsx';


describe ('Cooking Times', ()=>{

    it('Should render app', () => {

       render(<App />) ;

    });



});