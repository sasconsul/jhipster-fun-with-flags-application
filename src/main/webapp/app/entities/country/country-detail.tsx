import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CountryDetail extends React.Component<ICountryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { countryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterFunWithFlagsApp.country.detail.title">Country</Translate> [<b>{countryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="country">
                <Translate contentKey="jhipsterFunWithFlagsApp.country.country">Country</Translate>
              </span>
            </dt>
            <dd>{countryEntity.country}</dd>
            <dt>
              <span id="flag">
                <Translate contentKey="jhipsterFunWithFlagsApp.country.flag">Flag</Translate>
              </span>
            </dt>
            <dd>{countryEntity.flag}</dd>
            <dt>
              <Translate contentKey="jhipsterFunWithFlagsApp.country.continent">Continent</Translate>
            </dt>
            <dd>{countryEntity.continent ? countryEntity.continent.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/country" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/country/${countryEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ country }: IRootState) => ({
  countryEntity: country.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryDetail);
