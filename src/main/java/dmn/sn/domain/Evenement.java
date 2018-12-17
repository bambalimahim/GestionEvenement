package dmn.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Evenement.
 */
@Entity
@Table(name = "evenement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evenement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "date_evenement", nullable = false)
    private LocalDate dateEvenement;

    @OneToOne    @JoinColumn(unique = true)
    private Presence presence;

    @OneToMany(mappedBy = "evenement")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lieu> lieus = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Evenement nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public LocalDate getDateEvenement() {
        return dateEvenement;
    }

    public Evenement dateEvenement(LocalDate dateEvenement) {
        this.dateEvenement = dateEvenement;
        return this;
    }

    public void setDateEvenement(LocalDate dateEvenement) {
        this.dateEvenement = dateEvenement;
    }

    public Presence getPresence() {
        return presence;
    }

    public Evenement presence(Presence presence) {
        this.presence = presence;
        return this;
    }

    public void setPresence(Presence presence) {
        this.presence = presence;
    }

    public Set<Lieu> getLieus() {
        return lieus;
    }

    public Evenement lieus(Set<Lieu> lieus) {
        this.lieus = lieus;
        return this;
    }

    public Evenement addLieu(Lieu lieu) {
        this.lieus.add(lieu);
        lieu.setEvenement(this);
        return this;
    }

    public Evenement removeLieu(Lieu lieu) {
        this.lieus.remove(lieu);
        lieu.setEvenement(null);
        return this;
    }

    public void setLieus(Set<Lieu> lieus) {
        this.lieus = lieus;
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
        Evenement evenement = (Evenement) o;
        if (evenement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evenement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evenement{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", dateEvenement='" + getDateEvenement() + "'" +
            "}";
    }
}
