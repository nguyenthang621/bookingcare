import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ExtraInforDoctor.scss';

class ExtraInforDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDay: [],
            price: '',
            addressClinic: '',
            typePayment: '',
            note: '',
            province: '',
            nameClinic: '',
        };
    }
    async componentDidMount() {
        let { dataCurrentDoctor } = this.props;
        let doctorInfor = dataCurrentDoctor.Doctor_Infor;

        this.setState({
            price: doctorInfor.priceData,
            addressClinic: doctorInfor.addressClinic,
            typePayment: doctorInfor.paymentData,
            province: doctorInfor.provinceData,
            note: doctorInfor.note,
            nameClinic: doctorInfor.clinicData?.nameClinic,
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.dataCurrentDoctor !== this.props.dataCurrentDoctor) {
            this.setState({
                detailDoctor: this.props.dataCurrentDoctor,
            });
        }
    }

    render() {
        let { languageRedux, isShowPrice } = this.props;
        let { price, addressClinic, typePayment, province, nameClinic } = this.state;

        if (languageRedux === LANGUAGES.VI) {
            price = price?.valueVi;
            province = province?.valueVi;
            if (typePayment?.keyMap === 'PAY3') {
                typePayment = 'tiền mặt và quẹt thẻ';
            } else {
                typePayment = typePayment?.valueVi;
            }
        } else {
            price = price?.valueEn;
            province = province?.valueEn;
            if (typePayment?.keyMap === 'PAY3') {
                typePayment = 'cash and by swiping a card';
            } else {
                typePayment = typePayment?.valueEn;
            }
        }
        return (
            <div className="container-infor">
                <div className="address-clinic">
                    <h2>
                        <FormattedMessage id="patient.schedule.addressClinic" />
                    </h2>
                    <h4>{nameClinic}</h4>
                    <p>{`${addressClinic} _ (${province})`}</p>
                </div>
                <div className="price-container">
                    <h2>
                        <FormattedMessage id="patient.schedule.price" />:{' '}
                        {!isShowPrice && (
                            <span className="price">
                                {price}
                                {languageRedux === LANGUAGES.VI ? 'VND' : '$'}
                            </span>
                        )}
                    </h2>

                    {isShowPrice && (
                        <table className="table-price">
                            <thead></thead>
                            <tbody>
                                <tr className="row-price">
                                    <td>
                                        <h2>
                                            <FormattedMessage id="patient.schedule.price" />:
                                        </h2>
                                        <p>
                                            <FormattedMessage id="patient.schedule.priceText" />
                                        </p>
                                    </td>
                                    <span className="price-label">
                                        {price}
                                        {languageRedux === LANGUAGES.VI ? <sup>đ</sup> : <sup>$</sup>}
                                    </span>
                                </tr>
                            </tbody>
                            <tfoot className="row-price row2">
                                <tr>
                                    <td>
                                        <FormattedMessage id="patient.schedule.typePaymentText" /> {typePayment}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInforDoctor);
