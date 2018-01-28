// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BootstrapAlert from 'components/bootstrap-alert';

export default class PagesComponent extends Component {
    state = {
        pageName: this.props.pageName,
        id: this.props.id,
        updatedPageName: null,
        alertStatus: null,
    };

    handleChange(e) {
        this.setState({ pageName: e.target.value });
    }

    removeAlert() {
        this.setState({ alertStatus: null });
    }

    changePageName(e) {
        e.preventDefault();
        axios
            .put(
                '/page',
                {
                    pageName: this.state.pageName,
                    id: this.state.id,
                },
                {
                    withCredentials: true,
                },
            )
            .then(resp => {
                this.setState({ alertStatus: 'success', updatedPageName: resp.data.pageName });
                this.props.updatePagesList({
                    id: this.state.id,
                    name: this.state.updatedPageName,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col col-10 page-section">
                    <h4>page name</h4>
                    <form>
                        <div className="form-group">
                            <input
                                value={this.state.pageName}
                                onChange={e => this.handleChange(e)}
                                type="text"
                                className="form-control"
                                id="pageName"
                                aria-describedby="pageNameHelp"
                                placeholder="Page Name"
                            />
                        </div>
                        {this.state.alertStatus === 'success' ? (
                            <BootstrapAlert
                                message={`Your page is now named ${this.state.updatedPageName}.`}
                                type="success"
                                clickHandler={() => this.removeAlert()}
                            />
                        ) : null}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={e => this.changePageName(e)}>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

// PagesComponent.propTypes = {
//     id: PropTypes.number,
//     pageName: PropTypes.string,
// };
