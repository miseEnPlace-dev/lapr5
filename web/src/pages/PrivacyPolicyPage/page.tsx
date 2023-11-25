import { useNavigate } from "react-router-dom";

import { ArrowLeftIcon } from "@/styles/Icons";

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-8 py-24 md:px-24">
      <button
        className="flex items-center gap-x-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="absolute left-4 top-4 h-8 w-8 text-slate-500" />
      </button>
      <h1 className="text-center text-4xl font-bold">
        Política de Privacidade - RobDroneGO
      </h1>

      <article className="mt-12">
        <h2 className="text-2xl font-semibold">
          Aplicação do Regulamento Geral sobre a Proteção de Dados
        </h2>
        <p className="mt-2">Em vigor a partir de 19 de novembro de 2023.</p>
        <p className="mt-2">
          De maneira a compreender que informações são recolhidas e como são
          utilizadas a RobDroneGO, S.A aconselha que leia esta Política de
          Privacidade que visa explicar as práticas no que diz respeito à
          recolha, utilização e conservação de determinadas informações,
          incluindo os dados pessoais de todos os utilizadores, no âmbito da
          utilização da plataforma RobDroneGO. Criamos o nosso serviço tendo
          como base o respeito pela sua privacidade e que cumpre a legislação de
          proteção de dados pessoais em vigor nomeadamente o Regulamento (UE)
          2016/679 do Parlamento Europeu e do Conselho, de 27 de Abril de 2016.
          A RobDroneGO, S.A é uma empresa que realiza a administração da
          execução de tarefas de uma frota de robots e drones. A RobDroneGO é
          uma aplicação que auxilia os diferentes tipos de funcionários da
          empresa a realizarem de maneira mais simples e rápida o seu trabalho,
          como os Gestores de Frota, Gestores de Campus, Gestores de Tarefas e
          os Administradores. Cada um destes tipos de funcionário têm acesso a
          um leque de funcionalidades específicas relacionadas com o seu cargo.
        </p>
      </article>

      <article className="mt-12">
        <h2 className="text-2xl font-semibold">Responsável pelo tratamento</h2>
        <p className="mt-2">
          A RobDroneGO, S.A, sediada no Porto, é a organização responsável pelo
          tratamento dos seus dados pessoais. Poderá entrar em contacto com a
          empresa através do email{" "}
          <a
            href="mailto:support@robdronego.pt"
            className="text-primary underline"
          >
            support@robdronego.pt
          </a>{" "}
          ou dirigindo-se aos escritórios da empresa em Rua Portugal, nº 456,
          Porto.
        </p>
      </article>

      <article className="mt-12">
        <h2 className="text-2xl font-semibold">
          Recolha de Informações e Finalidade da Recolha
        </h2>
        <p className="mt-2">
          Para usar a nossa aplicação é necessário ter uma conta de utilizador,
          criada pelo nosso administrador, e por esse motivo é preciso
          fornecer-nos certas informações. Isto inclui o nome, palavra-passe,
          endereço de correio eletrónico, número de telemóvel e o seu cargo na
          organização. O número de telemóvel é necessário para facilitar o
          contacto em caso de necessidade de coordenação operacional entre os
          diferentes utilizadores. O endereço de email é usado para
          identificação e, em conjunto com a palavra-passe, para autenticação no
          sistema. O nome tem o propósito de identificar o utilizador e o cargo
          na organização para determinar quais as funcionalidades do nosso
          serviço é que o utilizador deve ter acesso. Podemos então concluir que
          todos os dados solicitados têm um fim específico e justificado,
          conforme a disposição legal da alínea (c) do nº1 do Artigo 5° do RGPD.
        </p>
        <p className="mt-2">
          Para que o administrador possa registar o utilizador no sistema, o
          consentimento da recolha das suas informações é efetuado quando o
          trabalhador assina o seu contrato de trabalho. É nesse momento que é
          efetuada a garantia que o utilizador tem a idade mínima para consentir
          o uso dos seus dados pessoais. A qualquer momento é possível ao
          utilizador do sistema reler a política de privacidade.
        </p>
      </article>

      <article className="mt-12">
        <h2 className="text-2xl font-semibold">
          Direitos dos Titulares dos Dados
        </h2>
        <p className="mt-2">
          Ao abrigo da legislação de proteção de dados aplicável, tem o direito
          de aceder à sua informação pessoal (Artigo 15° do Regulamento Geral
          sobre a Proteção de Dados), retificar os seus dados (Artigo 16° do
          Regulamento Geral sobre a Proteção de Dados), efetuar a portabilidade,
          apagar as suas informações (Artigo 17° do Regulamento Geral sobre a
          Proteção de Dados), limitar e opor-se a determinados tratamentos das
          suas informações, bem como o direito de apresentação de uma reclamação
          junto da CNPD – Comissão Nacional de Proteção de Dados{" "}
          <a href="mailto:geral@cnpd.pt" className="text-primary underline">
            geral@cnpd.pt
          </a>
          . Para exercer os seus direitos, ou caso tenha uma questão relacionada
          com a nossa política de privacidade, contactando o nosso Encarregado
          da Proteção de Dados, através do email{" "}
          <a
            href="mailto:dados@robdronego.pt"
            className="text-primary underline"
          >
            dados@robdronego.pt
          </a>{" "}
          ou pelo número de telemóvel 919 999 999.
        </p>
      </article>

      <article className="mt-12">
        <h2 className="text-2xl font-semibold">Conservação das Informações</h2>
        <p className="mt-2">
          A RobDroneGO conservará os seus dados pessoais enquanto for
          trabalhador da empresa, pois a sua conta no nosso serviço é
          imprescindível para que consiga exercer o seu cargo. Quando a sua
          conta for eliminada, anonimizamos as suas informações pessoais não
          sendo possível recuperar esse conteúdo mais tarde.
        </p>
      </article>

      <article className="mt-12">
        <h2 className="text-2xl font-semibold">
          Alteração de informações pessoais
        </h2>
        <p className="mt-2">
          Os dados pessoais devem encontrar-se sempre atualizados e por este
          motivo o utilizador deve solicitar a correção dos mesmos sempre que se
          verifique uma alteração dos mesmos. Os dados que se encontravam
          incorretos são, de imediato, apagados.
        </p>
      </article>

      <article className="mt-12">
        <h2 className="text-2xl font-semibold">Conservação das Informações</h2>
        <p className="mt-2">
          A <strong>RobDroneGO</strong> conservará os seus dados pessoais
          enquanto for trabalhador da empresa, pois a sua conta no nosso serviço
          é imprescindível para que consiga exercer o seu cargo. Quando a sua
          conta for eliminada, anonimizamos as suas informações pessoais não
          sendo possível recuperar esse conteúdo mais tarde.{" "}
        </p>
      </article>

      <article className="mt-12">
        <h2 className="text-2xl font-semibold">Obrigações do Utilizador</h2>
        <p className="mt-2">
          O utilizador declara ser maior de idade e que leu a política de
          privacidade, concordando na sua totalidade com todas as informações
          nela presentes.
        </p>
      </article>

      <article className="mt-12">
        <h2 className="text-2xl font-semibold">Outros Termos</h2>
        <p className="mt-2">
          Os seus dados pessoais poderão ser comunicados a entidades públicas ou
          autoridades judiciais, se assim for obrigatório por lei ou para
          prevenir ou punir a prática de crimes.
        </p>
      </article>
    </section>
  );
};

export default PrivacyPolicyPage;
