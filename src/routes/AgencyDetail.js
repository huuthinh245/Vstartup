import React from 'react';

import Detail from '../components/AuthDetail';

export default class AgencyDetail extends React.Component {
  render() {
    const { data } = this.props.navigation.state.params;
    return <Detail navigation={this.props.navigation} data={data} />;
  }
}
