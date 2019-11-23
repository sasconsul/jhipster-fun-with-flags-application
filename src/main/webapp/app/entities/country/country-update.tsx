import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContinent } from 'app/shared/model/continent.model';
import { getEntities as getContinents } from 'app/entities/continent/continent.reducer';
import { getEntity, updateEntity, createEntity, reset } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICountryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICountryUpdateState {
  isNew: boolean;
  continentId: string;
}

export class CountryUpdate extends React.Component<ICountryUpdateProps, ICountryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      continentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getContinents();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { countryEntity } = this.props;
      const entity = {
        ...countryEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/country');
  };

  render() {
    const { countryEntity, continents, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterFunWithFlagsApp.country.home.createOrEditLabel">
              <Translate contentKey="jhipsterFunWithFlagsApp.country.home.createOrEditLabel">Create or edit a Country</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : countryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="country-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="country-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="countryLabel" for="country-country">
                    <Translate contentKey="jhipsterFunWithFlagsApp.country.country">Country</Translate>
                  </Label>
                  <AvField id="country-country" type="text" name="country" />
                </AvGroup>
                <AvGroup>
                  <Label id="flagLabel" for="country-flag">
                    <Translate contentKey="jhipsterFunWithFlagsApp.country.flag">Flag</Translate>
                  </Label>
                  <AvField id="country-flag" type="text" name="flag" />
                </AvGroup>
                <AvGroup>
                  <Label for="country-continent">
                    <Translate contentKey="jhipsterFunWithFlagsApp.country.continent">Continent</Translate>
                  </Label>
                  <AvInput id="country-continent" type="select" className="form-control" name="continent.id">
                    <option value="" key="0" />
                    {continents
                      ? continents.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/country" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  continents: storeState.continent.entities,
  countryEntity: storeState.country.entity,
  loading: storeState.country.loading,
  updating: storeState.country.updating,
  updateSuccess: storeState.country.updateSuccess
});

const mapDispatchToProps = {
  getContinents,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryUpdate);
