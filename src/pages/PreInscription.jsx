import { useState } from 'react';
import './preInscription.css'



export default function PreInscription() {
  const [formulaire, setFormulaire] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    categorie: '',
    cotisation: '',
    modePaiement: ['Chèque', 'Espèces', 'Virement', 'Carte bancaire', 'carte CJeune','Chèque CAF'],
    numeroCarteCJeune: '',
    commentaire: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    // Champs pour les représentants légaux
    nomRL1: '',
    prenomRL1: '',
    nomRL2: '',
    prenomRL2: '',
    emailRL1: '',
    emailRL2: '',
    telephoneRL1: '',
    telephoneRL2: ''
  });

  const cotisationsParCategorie = {
    "Baby basket": 200,
    "U7": 120 ,
    "U9": 120,
    "U11": 140,
    "U13": 150,
    "U15": 170,
    "U18": 180,
    "Seniors": 190,
    "Loisirs": 100
};
const estMineur = () => {
  if (!formulaire.dateNaissance) return true; // par défaut, afficher les champs
  const anneeNaissance = new Date(formulaire.dateNaissance).getFullYear();
  return anneeNaissance > 2007;
};



  const [message, setMessage] = useState('');

 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'categorie') {
    setFormulaire(prev => ({
      ...prev,
      categorie: value,
      cotisation: cotisationsParCategorie[value] || ''
    }));
  } else {
    setFormulaire(prev => ({ ...prev, [name]: value }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/inscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulaire)
    });

    if (res.ok) {
      setMessage("✅ Pré-inscription enregistrée !");
      setFormulaire({
        nom: '', prenom: '', dateNaissance: '', categorie: '',
        cotisation: '', commentaire: '', email: '', telephone: ''
      });
    } else {
      const err = await res.json();
      setMessage(`❌ ${err.message || 'Erreur lors de la pré-inscription'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-preinscription">
      <h2>📝 Pré-Inscription</h2>
      
      <input type="text" name="nom" placeholder="Nom adherent" value={formulaire.nom} onChange={handleChange} required />
      <input type="text" name="prenom" placeholder="Prénom adherent" value={formulaire.prenom} onChange={handleChange} required />
      <input type="date" name="dateNaissance" value={formulaire.dateNaissance} onChange={handleChange} />
      <select name="categorie" value={formulaire.categorie} onChange={handleChange} required>
        <option value="">Catégorie</option>
            <option value="Baby basket">Baby basket</option>
            <option value="U7">U7 (Enfant né en 2019 ou 2020)</option>
            <option value="U9">U9 (Enfant né en 2017 ou 2018)</option>
            <option value="U11">U11 (Enfant né en 2015 ou 2016)</option>
            <option value="U13">U13 (Enfant né en 2013 ou 2014)</option>
            <option value="U15">U15 (Enfant né en 2011 ou 2012)</option>
            <option value="U18">U18 (Enfant né en 2008, 2009 ou 2010)</option>
            <option value="Seniors">Seniors</option>
            <option value="Loisirs">Loisirs (Jusqu’à 97 ans)</option>
      </select>
       <input type="number" name="cotisation" placeholder="Montant cotisation €" value={formulaire.cotisation} readOnly required />
      <input type="text" name="adresse" placeholder="Adresse" value={formulaire.adresse} onChange={handleChange} required />
       <input type="text" name="codePostal" placeholder="Code postal" value={formulaire.codePostal} onChange={handleChange} required />
      <input type="text" name="ville" placeholder="Ville" value={formulaire.ville} onChange={handleChange} required />
         
      <textarea name="commentaire" placeholder="Commentaire éventuel" value={formulaire.commentaire} onChange={handleChange} />
        <input type="email" name="email" placeholder="Adresse e-mail" value={formulaire.email} onChange={handleChange} required />
        <input type="tel" name="telephone" placeholder="Téléphone" value={formulaire.telephone} onChange={handleChange} required />
       {estMineur() && (
  <>
    <input
      type="text"
      name="nomRL1"
      placeholder="Nom représentant légal 1"
      value={formulaire.nomRL1}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="prenomRL1"
      placeholder="Prénom représentant légal 1"
      value={formulaire.prenomRL1}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="nomRL2"
      placeholder="Nom représentant légal 2"
      value={formulaire.nomRL2}
      onChange={handleChange}
    />
    <input
      type="text"
      name="prenomRL2"
      placeholder="Prénom représentant légal 2"
      value={formulaire.prenomRL2}
      onChange={handleChange}
    />
    <input
      type="email"
      name="emailRL1"
      placeholder="Adresse e-mail RL 1"
      value={formulaire.emailRL1}
      onChange={handleChange}
      required
    />
    <input
      type="email"
      name="emailRL2"
      placeholder="Adresse e-mail RL 2"
      value={formulaire.emailRL2}
      onChange={handleChange}
    />
    <input
      type="tel"
      name="telephoneRL1"
      placeholder="Téléphone RL 1"
      value={formulaire.telephoneRL1}
      onChange={handleChange}
    />
    <input
      type="tel"
      name="telephoneRL2"
      placeholder="Téléphone RL 2"
      value={formulaire.telephoneRL2}
      onChange={handleChange}
    />
  </>
)}

       <fieldset className="checkboxes-paiement">
  <legend>Mode(s) de paiement</legend>
  {['Chèque', 'Espèces', 'Virement', 'Carte bancaire', 'carte CJeune', 'Chèque CAF'].map((moyen) => (
    <label key={moyen}>
      <input
        type="checkbox"
        name="modePaiement"
        value={moyen}
        checked={formulaire.modePaiement.includes(moyen)}
        onChange={(e) => {
          const checked = e.target.checked;
          const value = e.target.value;

          setFormulaire(prev => ({
            ...prev,
            modePaiement: checked
              ? [...prev.modePaiement, value]
              : prev.modePaiement.filter(mp => mp !== value)
          }));
        }}
      />
      {moyen}
    </label>
  ))}
</fieldset>


{formulaire.modePaiement.includes("carte CJeune") && (
  <input
    type="text"
    name="numeroCarteCJeune"
    placeholder="Numéro carte CJeune"
    value={formulaire.numeroCarteCJeune}
    onChange={handleChange}
    required
  />
)}

{formulaire.modePaiement && (
  <p style={{ color: '#7f1d1d', fontWeight: 500 }}>
    Mode de paiement sélectionné : {formulaire.modePaiement}
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

