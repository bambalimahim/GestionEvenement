package dmn.sn.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Membre.
 */
@Entity
@Table(name = "membre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Membre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @OneToOne    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "membre_presence",
               joinColumns = @JoinColumn(name = "membres_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "presences_id", referencedColumnName = "id"))
    private Set<Presence> presences = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTelephone() {
        return telephone;
    }

    public Membre telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public User getUser() {
        return user;
    }

    public Membre user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Presence> getPresences() {
        return presences;
    }

    public Membre presences(Set<Presence> presences) {
        this.presences = presences;
        return this;
    }

    public Membre addPresence(Presence presence) {
        this.presences.add(presence);
        presence.getMembres().add(this);
        return this;
    }

    public Membre removePresence(Presence presence) {
        this.presences.remove(presence);
        presence.getMembres().remove(this);
        return this;
    }

    public void setPresences(Set<Presence> presences) {
        this.presences = presences;
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
        Membre membre = (Membre) o;
        if (membre.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), membre.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Membre{" +
            "id=" + getId() +
            ", telephone='" + getTelephone() + "'" +
            "}";
    }
}
