import React from 'react';
import PanelContent from './PanelContent';
import renderer, { act } from 'react-test-renderer';
import { Formik } from 'formik';
import { useBoolean, useFetcher, useHandleData } from '../../../../hooks';
import { Autocomplete, Select } from 'apollo-react-native';

jest.mock('../../../../hooks');

describe('PanelHeader', () => {
  beforeAll(() => {
    useBoolean.mockReturnValue([
      false,
      { setTrue: jest.fn(), setFalse: jest.fn() },
    ]);
    useHandleData.mockImplementation(data => fn => fn(data.data));
    useFetcher.mockReturnValue([
      {
        data: [],
      },
      {
        locationsActions: jest.fn(),
        handleFetch: jest.fn(),
      },
    ]);
  });

  it('should render properly', async () => {
    const Component = () => (
      <Formik
        enableReinitialize
        initialValues={{
          fields: {
            fromSalesRepTerritory: '',
            fromSalesRep: '',
            shipTo: '',
            receivedDate: 'Tue Jun 02 2020 13:23:52 GMT+0300',
            conditionOfPackage: '',
            comments: '',
            user: {},
          },
        }}
      >
        <PanelContent />
      </Formik>
    );
    let tree;
    await act(async () => {
      tree = renderer.create(<Component />);
    });

    await act(() => tree.root.findByType(Autocomplete).props.onChange());
    await act(() => tree.root.findAllByType(Select)[0].props.onChange());
    await act(() => tree.root.findAllByType(Select)[1].props.onChange());

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render in readonly mode properly', async () => {
    const Component = () => (
      <Formik
        enableReinitialize
        initialValues={{
          fields: {
            fromSalesRepTerritory: '',
            fromSalesRep: '',
            shipTo: '',
            receivedDate: 'Tue Jun 02 2020 13:23:52 GMT+0300',
            conditionOfPackage: '',
            comments: '',
            user: {},
          },
        }}
      >
        <PanelContent readonly/>
      </Formik>
    );
    let tree;
    await act(async () => {
      tree = renderer.create(<Component />);
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
