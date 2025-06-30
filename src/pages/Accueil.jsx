import ActusDéfilantes from '../components/ActusDéfilantes';

export default function Accueil() {
  return (
    <div className="accueil">
      <header>
        <nav className="menu-horizontal">
          {/* ... tes liens */}
        </nav>
      </header>

      <ActusDéfilantes />

      <main>
        <h1>Bienvenue sur le site officiel du club 🏟️</h1>
        <p>Explorez nos produits, suivez l’actualité, et vivez la passion du sport avec nous.</p>
      </main>
    </div>
  );
}
