import { useState } from 'react';
import './preInscription.css';

export default function PreInscription() {
  const [formulaire, setFormulaire] = useState({
    typeAdhesion: '',
    nom: '',
    prenom: '',
    sexe: '',
    dateNaissance: '',
    categorie: '',
    cotisation: '',
    adresse: '',
    codePostal: '',
    ville: '',
    email: '',
    telephone: '',
    commentaire: '',
    modePaiement: [],
    numeroCarteCJeune: ''
  });

  const [representantsRL, setRepresentantsRL] = useState({
    nomRL1: '', prenomRL1: '', emailRL1: '', telephoneRL1: '',
    nomRL2: '', prenomRL2: '', emailRL2: '', telephoneRL2: ''
  });

  const [message, setMessage] = useState('');
 

  const categoriesFemme = {
    "Baby Basket": 200,
    "U7": 120,
    "U9F": 120,
    "U11F": 140,
    "U13F": 150,
    "U15F": 170,
    "U18F": 180,
    "Senior Femme": 190,
    "Loisirs": 100
  };

  const categoriesHomme = {
    "Baby Basket": 200,
    "U7": 120,
    "U9G": 120,
    "U11G": 140,
    "U13G": 150,
    "U15G": 170,
    "U18G": 180,
    "Senior Homme": 190,
    "Loisirs": 100
  };

  //const listeCategories = formulaire.sexe === 'feminin'
   // ? categoriesFemme
    //: formulaire.sexe === 'masculin'
    //? categoriesHomme
    //: {};
    const deduireCategorie = (annee, sexe) => {
  if (!annee || !sexe) return '';

  if (annee === 2021 || annee === 2022) return "Baby Basket";
  if (annee === 2019 || annee === 2020) return "U7";
  if (annee === 2017 || annee === 2018) return sexe === "feminin" ? "U9F" : "U9G";
  if (annee === 2015 || annee === 2016) return sexe === "feminin" ? "U11F" : "U11G";
  if (annee === 2013 || annee === 2014) return sexe === "feminin" ? "U13F" : "U13G";
  if (annee === 2011 || annee === 2012) return sexe === "feminin" ? "U15F" : "U15G";
  if ([2008, 2009, 2010].includes(annee)) return sexe === "feminin" ? "U18F" : "U18G";
  if (annee <= 2007) return '';

  return '';
};


  const estMineur = () => {
    if (!formulaire.dateNaissance) return true;
    const annee = new Date(formulaire.dateNaissance).getFullYear();
    return annee > 2007;
  };

 const handleChange = (e) => {
  const { name, value } = e.target;
  let updatedForm = { ...formulaire, [name]: value };

  if (name === "dateNaissance" || name === "sexe") {
    const annee = new Date(
      name === "dateNaissance" ? value : updatedForm.dateNaissance
    ).getFullYear();

    updatedForm.dateNaissance = name === "dateNaissance" ? value : formulaire.dateNaissance;
    updatedForm.sexe = name === "sexe" ? value : formulaire.sexe;

    const cat = deduireCategorie(annee, updatedForm.sexe);

    if (cat) {
      updatedForm.categorie = cat;
      updatedForm.cotisation = (updatedForm.sexe === "feminin" ? categoriesFemme : categoriesHomme)[cat] || '';
    } else {
      // On réinitialise la catégorie et la cotisation si adulte
      updatedForm.categorie = '';
      updatedForm.cotisation = '';
    }
  }

  if (name === "categorie") {
    const tarif = (formulaire.sexe === "feminin" ? categoriesFemme : categoriesHomme)[value] || '';
    updatedForm.categorie = value;
    updatedForm.cotisation = tarif;
  }

  if (name in representantsRL) {
    setRepresentantsRL(prev => ({ ...prev, [name]: value }));
  } else {
    setFormulaire(updatedForm);
  }
};



  const handlePaiementChange = (e) => {
    const { value, checked } = e.target;
    setFormulaire(prev => ({
      ...prev,
      modePaiement: checked
        ? [...prev.modePaiement, value]
        : prev.modePaiement.filter(mp => mp !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formulaire,
      representants: estMineur()
        ? [
            {
              nom: representantsRL.nomRL1,
              prenom: representantsRL.prenomRL1,
              email: representantsRL.emailRL1,
              telephone: representantsRL.telephoneRL1
            },
            representantsRL.nomRL2 && representantsRL.prenomRL2
              ? {
                  nom: representantsRL.nomRL2,
                  prenom: representantsRL.prenomRL2,
                  email: representantsRL.emailRL2,
                  telephone: representantsRL.telephoneRL2
                }
              : null
          ].filter(Boolean)
        : []
    };

    try {
      const res = await fetch('http://localhost:3000/api/inscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMessage("✅ Pré-inscription enregistrée !");
        setFormulaire({
          nom: '', prenom: '', sexe: '', dateNaissance: '', categorie: '',
          cotisation: '', adresse: '', codePostal: '', ville: '',
          email: '', telephone: '', commentaire: '', modePaiement: [], numeroCarteCJeune: ''
        });
        setRepresentantsRL({
          nomRL1: '', prenomRL1: '', emailRL1: '', telephoneRL1: '',
          nomRL2: '', prenomRL2: '', emailRL2: '', telephoneRL2: ''
        });
      } else {
        const err = await res.json();
        setMessage(`❌ ${err.message || 'Erreur lors de la pré-inscription'}`);
      }
    } catch {
      setMessage('❌ Serveur inaccessible');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-preinscription">
      <h2>📝 Pré-Inscription</h2>

      <select name="typeAdhesion" value={formulaire.typeAdhesion} onChange={handleChange} required>
  <option value="">Type d'adhésion</option>
  <option value="Nouvelle">Nouvelle adhésion</option>
  <option value="Renouvellement">Renouvellement</option>
</select>


      <input type="text" name="nom" placeholder="Nom adhérent" value={formulaire.nom} onChange={handleChange} required />
      <input type="text" name="prenom" placeholder="Prénom adhérent" value={formulaire.prenom} onChange={handleChange} required />
      
      <select name="sexe" value={formulaire.sexe} onChange={handleChange} required>
        <option value="">Sexe</option>
        <option value="masculin">Masculin</option>
        <option value="feminin">Féminin</option>
      </select>

     <input type="date" name="dateNaissance" value={formulaire.dateNaissance} onChange={handleChange} required min="1950-01-01"
/>


 {formulaire.dateNaissance && new Date(formulaire.dateNaissance).getFullYear() <= 2007 ? (
  <select name="categorie" value={formulaire.categorie} onChange={handleChange} required>
    <option value="">Catégorie adulte</option>
    {formulaire.sexe === "feminin" && (
      <>
        <option value="Senior Femme">Senior Femme</option>
        <option value="Loisirs">Loisirs</option>
      </>
    )}
    {formulaire.sexe === "masculin" && (
      <>
        <option value="Senior Homme">Senior Homme</option>
        <option value="Loisirs">Loisirs</option>
      </>
    )}
  </select>
) : (
  <input
    type="text"
    name="categorie"
    value={formulaire.categorie}
    readOnly
    placeholder="Catégorie automatiquement déterminée"
    required
  />
)}



      <input type="number" name="cotisation" placeholder="Cotisation €" value={formulaire.cotisation} readOnly required />

      <input type="text" name="adresse" placeholder="Adresse" value={formulaire.adresse} onChange={handleChange} required />
      <input type="text" name="codePostal" placeholder="Code postal" value={formulaire.codePostal} onChange={handleChange} required />
      <input type="text" name="ville" placeholder="Ville" value={formulaire.ville} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formulaire.email} onChange={(e) => setFormulaire({ ...formulaire, email: e.target.value })} required />
      <input type="tel" name="telephone" placeholder="Téléphone" value={formulaire.telephone} onChange={(e) => {
    const valeur = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormulaire({ ...formulaire, telephone: valeur });
  }} required />
      <textarea name="commentaire" placeholder="Commentaire" value={formulaire.commentaire} onChange={handleChange} />

      {estMineur() && (
        <>
          <h4>👨‍👩‍👧 Représentants légaux</h4>
          <input type="text" name="nomRL1" placeholder="Nom RL 1" value={representantsRL.nomRL1} onChange={handleChange} required />
          <input type="text" name="prenomRL1" placeholder="Prénom RL 1" value={representantsRL.prenomRL1} onChange={handleChange} required />
          <input type="email" name="emailRL1" placeholder="Email RL 1" value={representantsRL.emailRL1} onChange={(e) => setFormulaire({ ...formulaire, emailRL1: e.target.value })} required />
          <input type="tel" name="telephoneRL1" placeholder="Téléphone RL 1" value={representantsRL.telephoneRL1} onChange={(e) => {
    const valeur = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormulaire({ ...formulaire, telephoneRL1: valeur });
  }} />
          <input type="text" name="nomRL2" placeholder="Nom RL 2" value={representantsRL.nomRL2} onChange={handleChange} />
          <input type="text" name="prenomRL2" placeholder="Prénom RL 2" value={representantsRL.prenomRL2} onChange={handleChange} />
          <input type="email" name="emailRL2" placeholder="Email RL 2" value={representantsRL.emailRL2} onChange={(e) => setFormulaire({ ...formulaire, emailRL2: e.target.value })} />
          <input type="tel" name="telephoneRL2" placeholder="Téléphone RL 2" value={representantsRL.telephoneRL2} onChange={(e) => {
    const valeur = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormulaire({ ...formulaire, telephoneRL2: valeur });
  }}  />
        </>
      )}

            <fieldset>
        <legend>💳 Mode(s) de paiement</legend>
        {['Chèque', 'Espèces', 'Virement', 'Carte bancaire', 'carte CJeune', 'Chèque CAF'].map((mode) => (
          <label key={mode}>
            <input
              type="checkbox"
              name="modePaiement"
              value={mode}
              checked={formulaire.modePaiement.includes(mode)}
              onChange={handlePaiementChange}
            />
            {mode}
          </label>
        ))}
      </fieldset>

      {formulaire.modePaiement.includes('carte CJeune') && (
        <input
          type="text"
          name="numeroCarteCJeune"
          placeholder="Numéro carte CJeune"
          value={formulaire.numeroCarteCJeune}
          onChange={handleChange}
          required
        />
      )}

      {formulaire.modePaiement.length > 0 && (
        <p style={{ color: '#7f1d1d', fontWeight: 500 }}>
          Mode(s) de paiement sélectionné(s) : {formulaire.modePaiement.join(', ')}
        </p>
      )}

      <button type="submit">Envoyer la demande</button>

      {message && (
        <div className="confirmation-animation">
          <div className="checkmark-circle">
            <svg viewBox="0 0 52 52">
              <path d="M14 27 l10 10 l15 -20" fill="none" stroke="#fff" strokeWidth="5" />
            </svg>
          </div>
          <p>{message}</p>
        </div>
      )}
    </form>
  );
}
