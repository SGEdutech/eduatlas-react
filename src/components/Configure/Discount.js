import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DiscountCards from './Discounts/DiscountCards';

import {
	Col,
	Icon,
	Row
} from 'antd';

const plusIconStyle = {
	fontSize: '2.6rem',
	color: '#00bcd4',
	position: 'fixed',
	bottom: 70,
	right: 10
};

const colLayout = {
	xs: 24,
	sm: 12,
	md: 8,
	xl: 6,
	xxl: 4
};

class Discount extends Component {
	render() {
		return (
			<>
				<div className="container">
					<Row gutter={16}>
						<Col {...colLayout}>
							<div className="mb-3">
								<DiscountCards code="attractiveDiscountCoupon"
									amount="46" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-3">
								<DiscountCards code="attractiveDiscountCoupon"
									amount="46" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-3">
								<DiscountCards code="attractiveDiscountCoupon"
									amount="46" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-3">
								<DiscountCards code="attractiveDiscountCoupon"
									amount="46" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-3">
								<DiscountCards code="attractiveDiscountCoupon"
									amount="46" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-3">
								<DiscountCards code="attractiveDiscountCoupon"
									amount="46" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-3">
								<DiscountCards code="attractiveDiscountCoupon"
									amount="46" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-3">
								<DiscountCards code="attractiveDiscountCoupon"
									amount="46" />
							</div>
						</Col>
						<Col {...colLayout}>
							<div className="mb-3">
								<DiscountCards code="attractiveDiscountCoupon"
									amount="46" />
							</div>
						</Col>
					</Row>
				</div>
				<Link to="/add-discount">
					<Icon type="plus-circle" theme="filled" style={plusIconStyle} />
				</Link>
			</>
		);
	}
}

export default Discount;
