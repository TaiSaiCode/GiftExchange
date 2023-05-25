import { Link } from "react-router-dom";
const Help = () => {
  return (
    <>
      <div
        style={{
          border: "2px solid deepskyblue",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
        className="App"
      >
        <div className="container">
          <h2>Page d'aide</h2>
          <div className="row">
            <div className="col-lg-6 text-start">
              <h3>Groupes d'échange</h3>
              <p>
                Le premier utilisateur à{" "}
                <Link to="http://localhost:5173/register">s’inscrire</Link> sur
                le site sera l’administrateur. Les utilisateurs administrateurs
                peuvent créer des groupes d'échange de cadeaux. Chaque groupe
                doit avoir un nom, une description, une date d’échange, une date
                de pige, un budget de cadeau(x) et un lien web pour l’image du
                groupe.
              </p>
              <h3>Utilisateurs</h3>
              <p>
                Les utilisateurs administrateurs peuvent ajouter des membres à
                leurs groupes en utilisant l'adresse courriel des membres, leur
                nom et prénom. Une invitation par courriel est envoyée au(x)
                membre(s) invité(s). Les membres peuvent être supprimés des
                groupes par l'utilisateur administrateur, celui qui a créé le
                groupe. L'utilisateur administrateur peut aussi promouvoir
                d'autres membres comme administrateur. Les utilisateurs recevant
                une invitation courriel seront invités à cliquer sur un lien web
                qui les dirigera vers une page d’inscription au groupe d’échange
                de cadeaux afin qu’ils complètent leur profil.
              </p>
              <h3>Liste de souhait</h3>
              <p>
                Les utilisateurs peuvent ajouter, modifier et supprimer des
                cadeaux de leur liste de souhait. Chaque cadeau a un nom, une
                description et un prix, un lien web pour l’image du cadeau et un
                lien web pointant vers un site de vendeur.
              </p>
            </div>
            <div className="col-lg-6 text-start">
              <h3>Pige</h3>
              L'algorithme de pige sera conçu pour attribuer un membre à chaque
              autre membre du groupe de manière aléatoire, mais en s'assurant
              que personne ne se pige lui-même. Cela créera une sorte de chaîne
              où chaque membre est lié à un autre membre unique. Chaque membre
              recevra une notification par courriel lui indiquant le membre
              qu'il a pigé, ainsi que la liste de cadeaux souhaités de ce
              membre. Le membre est alors responsable de choisir un cadeau ou un
              groupe de cadeaux de cette liste pour offrir à la personne qu'il a
              pigée.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Help;
