import React, { useState, useEffect } from "react";

const About = () => {
  return (
    <>
      <div
        style={{
          borderRadius: 10,
          justifyContent: "center",
          padding: 25,
        }}
        className="App"
      >
        <div
          style={{
            border: "2px solid deepskyblue",
            borderRadius: 10,
            justifyContent: "center",
            width: "100%",
            height: "auto",
          }}
        >
          <br />
          <div className="container">
            <div className="row text-start">
              <h2>À propos</h2>
              <br />
              <p>
                Bienvenue sur Gift-XChange, un site d'échange de cadeaux
                révolutionnaire conçu par des étudiants en dernière session du
                programme A.E.C. Programmation Objet & Technologies Web du Cégep
                de Rosemont. Notre plateforme conviviale permet aux utilisateurs
                de créer des groupes d'échange en invitant au moins deux autres
                personnes à se joindre à leur groupe. Une fois que le groupe est
                formé, de nouveaux membres peuvent être ajoutés tant que la pige
                n'a pas été effectuée.
              </p>

              <p>
                Notre site a été développé dans le cadre d'un projet final dans
                un cours d'intégration, et notre équipe a travaillé dur pour
                concevoir un système de pige équitable et amusant.
                L'administrateur du groupe peut créer des groupes d'exclusion
                pour éviter que deux personnes ne se pigent mutuellement ou pour
                empêcher que des personnes en couple ne se pigent mutuellement.
              </p>

              <p>
                Nous sommes convaincus que Gift-XChange est le site parfait pour
                organiser des échanges de cadeaux amusants et conviviaux, que ce
                soit pour votre famille, vos amis ou vos collègues de travail.
                Alors, rejoignez-nous dès maintenant et profitez de notre
                plateforme conviviale pour organiser votre prochain échange de
                cadeaux !
              </p>
            </div>
            <div className="row">
              <h4>Membres de l'&eacute;quipe:</h4>
              <br />
              <ul>
                <li>Nicolas Mathieu</li>
                <li>Joey Mallet</li>
                <li>Etienne Robert</li>
                <li>Della Franck Amegnignon</li>
                <li>Tran Tom</li>
                <li>Bruno Theorêt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
