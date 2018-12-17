package dmn.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Presence.
 */
@Entity
@Table(name = "presence")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Presence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "presence")
    @JsonIgnore
    private Evenement evenement;

    @ManyToMany(mappedBy = "presences")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Membre> membres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Evenement getEvenement() {
        return evenement;
    }

    public Presence evenement(Evenement evenement) {
        this.evenement = evenement;
        return this;
    }

    public void setEvenement(Evenement evenement) {
        this.evenement = evenement;
    }

    public Set<Membre> getMembres() {
        return membres;
    }

    public Presence membres(Set<Membre> membres) {
        this.membres = membres;
        return this;
    }

    public Presence addMembre(Membre membre) {
        this.membres.add(membre);
        membre.getPresences().add(this);
        return this;
    }

    public Presence removeMembre(Membre membre) {
        this.membres.remove(membre);
        membre.getPresences().remove(this);
        return this;
    }

    public void setMembres(Set<Membre> membres) {
        this.membres = membres;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Presence presence = (Presence) o;
        if (presence.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), presence.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Presence{" +
            "id=" + getId() +
            "}";
    }
}
