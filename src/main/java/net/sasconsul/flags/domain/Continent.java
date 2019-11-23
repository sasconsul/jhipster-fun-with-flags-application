package net.sasconsul.flags.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Continent.
 */
@Entity
@Table(name = "continent")
public class Continent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "continent")
    private String continent;

    @OneToMany(mappedBy = "continent")
    private Set<Country> countries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContinent() {
        return continent;
    }

    public Continent continent(String continent) {
        this.continent = continent;
        return this;
    }

    public void setContinent(String continent) {
        this.continent = continent;
    }

    public Set<Country> getCountries() {
        return countries;
    }

    public Continent countries(Set<Country> countries) {
        this.countries = countries;
        return this;
    }

    public Continent addCountry(Country country) {
        this.countries.add(country);
        country.setContinent(this);
        return this;
    }

    public Continent removeCountry(Country country) {
        this.countries.remove(country);
        country.setContinent(null);
        return this;
    }

    public void setCountries(Set<Country> countries) {
        this.countries = countries;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Continent)) {
            return false;
        }
        return id != null && id.equals(((Continent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Continent{" +
            "id=" + getId() +
            ", continent='" + getContinent() + "'" +
            "}";
    }
}
