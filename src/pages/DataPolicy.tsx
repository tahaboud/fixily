import Footer from "../components/landingPage/sections/Footer";
import Navbar from "../components/landingPage/sections/Navbar";

const DataPolicy = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-40 pb-10 px-4 md:px-20 xl:px-40 flex flex-col gap-4 [&>h2]:text-2xl [&>h2]:font-semibold">
        <h1 className="text-3xl font-bold">
          Comment Demander la Suppression de Vos Données chez Fixily?
        </h1>
        <p>
          Si vous souhaitez demander la suppression de vos données de notre
          système, veuillez suivre les étapes ci-dessous. Le processus est
          manuel et géré par notre équipe administrative.
        </p>

        <h2>Instructions Étape par Étape:</h2>
        <ol className="list-decimal ms-4">
          <li>
            <h3>Préparez Votre Demande:</h3>
            <ul className="list-disc ms-8">
              <li>
                Assurez-vous de disposer des informations nécessaires pour
                identifier vos données dans notre système. Cela inclut
                généralement :
              </li>
              <li>Votre nom complet</li>
              <li>Votre adresse e-mail utilisée pour l’inscription</li>
              <li>
                Tous les détails pertinents de votre compte ou de vos
                transactions
              </li>
            </ul>
          </li>
          <li>
            <h3>Rédigez Votre Email:</h3>
            <ul className="list-disc ms-8">
              <li>
                Ouvrez votre client de messagerie et composez un nouvel email.
              </li>
              <li>
                Adressez l’email à :{" "}
                <a href="mailto:admin@fixily.net">admin@fixily.net</a>
              </li>
              <li>
                Utilisez la ligne d’objet suivante pour plus de clarté :{" "}
                <strong>Demande de Suppression de Données</strong>
              </li>
            </ul>
          </li>
          <li>
            <h3>Incluez les Détails Nécessaires:</h3>
            <ul className="list-disc ms-8">
              <li>
                Dans le corps de l’email, incluez les informations suivantes :
              </li>
              <li>
                Une déclaration claire demandant la suppression de vos données.
              </li>
              <li>Votre nom complet.</li>
              <li>L’adresse e-mail associée à votre compte Fixily.</li>
              <li>
                Tous les détails supplémentaires pouvant aider à identifier vos
                données (ex : ID de compte, références de transaction).
              </li>
            </ul>
          </li>
          <li>
            <h3>Exemple d’Email:</h3>
            <p className="my-4 border rounded-md p-4">
              À : <a href="mailto:admin@fixily.net">admin@fixily.net</a>
              <br />
              Objet : Demande de Suppression de Données
              <br />
              Bonjour,
              <br />
              Je vous écris pour demander la suppression de mes données
              personnelles de votre système. Veuillez trouver mes informations
              ci-dessous :
              <br />
              Nom Complet : [Votre Nom Complet]
              <br />
              Adresse Email : [Votre Adresse Email]
              <br />
              Autres Informations Pertinentes : [Tous autres détails pouvant
              aider à identifier vos données comme le numéro du téléphone]
              <br />
              Merci pour votre assistance.
              <br />
              Cordialement,
              <br />
              [Votre Nom Complet]
            </p>
          </li>
          <li>
            <h3>Envoyez Votre Email:</h3>
            <ul className="list-disc ms-8">
              <li>
                Vérifiez votre email pour vous assurer que toutes les
                informations nécessaires y sont incluses.
              </li>
              <li>
                Envoyez l’email à{" "}
                <a href="mailto:admin@fixily.net">admin@fixily.net</a>.
              </li>
            </ul>
          </li>
          <li>
            <h3>Attendez la Confirmation:</h3>
            <ul className="list-disc ms-8">
              <li>
                Notre équipe administrative traitera votre demande. Cela peut
                prendre un certain temps en fonction du volume des demandes.
              </li>
              <li>
                Vous recevrez un email de confirmation une fois vos données
                supprimées.
              </li>
            </ul>
          </li>
        </ol>

        <h2>Notes Importantes:</h2>
        <ul className="list-disc ms-8">
          <li>
            <strong>Vérification:</strong> Nous pourrions avoir besoin de
            vérifier votre identité pour traiter votre demande. Soyez prêt à
            fournir des informations supplémentaires si demandé.
          </li>
          <li>
            <strong>Délai de Traitement:</strong> Les demandes de suppression de
            données sont traitées manuellement. Veuillez prévoir jusqu’à 30
            jours pour le traitement de votre demande.
          </li>
          <li>
            <strong>Politiques de Conservation des Données:</strong> Certaines
            données peuvent devoir être conservées pour des raisons légales ou
            réglementaires. Notre équipe vous informera si certaines de vos
            données ne peuvent pas être supprimées.
          </li>
        </ul>

        <p>
          Pour toute autre assistance ou question:{" "}
          <a href="mailto:support@fixily.net">support@fixily.net</a>
        </p>

        {/* <hr> */}
        <div
          dir="rtl"
          className="flex flex-col gap-4 [&>h2]:text-2xl [&>h2]:font-semibold">
          <h1 className="text-3xl font-bold">
            كيفية طلب إزالة بياناتك من Fixily
          </h1>
          <p>
            إذا كنت ترغب في طلب إزالة بياناتك من نظامنا، يرجى اتباع الخطوات
            التالية. العملية يدوية وتتم بواسطة فريقنا الإداري.
          </p>

          <h2>تعليمات خطوة بخطوة:</h2>
          <ol className="list-decimal ms-4">
            <li>
              <h3>جهز طلبك:</h3>
              <ul className="list-disc ms-8">
                <li>
                  تأكد من أن لديك المعلومات اللازمة لتحديد بياناتك في نظامنا.
                  يشمل ذلك عادة:
                </li>
                <li>اسمك الكامل</li>
                <li>عنوان بريدك الإلكتروني المستخدم للتسجيل</li>
                <li>أي تفاصيل ذات صلة بحسابك أو بمعاملاتك</li>
              </ul>
            </li>
            <li>
              <h3>اكتب بريدك الإلكتروني:</h3>
              <ul className="list-disc ms-8">
                <li>
                  افتح عميل البريد الإلكتروني الخاص بك واكتب رسالة بريد إلكتروني
                  جديدة.
                </li>
                <li>
                  وجه البريد الإلكتروني إلى :{" "}
                  <a href="mailto:admin@fixily.net">admin@fixily.net</a>
                </li>
                <li>
                  استخدم السطر الموضوع التالي للوضوح :{" "}
                  <strong>طلب إزالة البيانات</strong>
                </li>
              </ul>
            </li>
            <li>
              <h3>قم بتضمين التفاصيل الضرورية:</h3>
              <ul className="list-disc ms-8">
                <li>في جسم البريد الإلكتروني، قم بتضمين المعلومات التالية:</li>
                <li>بيان واضح يطلب إزالة بياناتك.</li>
                <li>اسمك الكامل.</li>
                <li>عنوان البريد الإلكتروني المرتبط بحساب Fixily الخاص بك.</li>
                <li>
                  أي تفاصيل إضافية يمكن أن تساعد في تحديد بياناتك (مثل معرف
                  الحساب، مراجع المعاملات).
                </li>
              </ul>
            </li>
            <li>
              <h3>نموذج البريد الإلكتروني:</h3>
              <p className="my-4 border rounded-md p-4">
                إلى : <a href="mailto:admin@fixily.net">admin@fixily.net</a>
                <br />
                الموضوع : طلب إزالة البيانات
                <br />
                فريق إدارة Fixily المحترم،
                <br />
                أكتب لأطلب إزالة بياناتي الشخصية من نظامكم. يرجى العثور على
                تفاصيل بياناتي أدناه:
                <br />
                الاسم الكامل : [اسمك الكامل]
                <br />
                عنوان البريد الإلكتروني : [عنوان بريدك الإلكتروني]
                <br />
                معرف الحساب : [معرف حسابك إن وجد]
                <br />
                معلومات أخرى ذات صلة : [أي تفاصيل أخرى يمكن أن تساعد في تحديد
                بياناتك]
                <br />
                مع أطيب التحيات،
                <br />
                [اسمك الكامل]
              </p>
            </li>
            <li>
              <h3>أرسل بريدك الإلكتروني:</h3>
              <ul className="list-disc ms-8">
                <li>
                  راجع بريدك الإلكتروني للتأكد من تضمين جميع المعلومات الضرورية.
                </li>
                <li>
                  أرسل البريد الإلكتروني إلى{" "}
                  <a href="mailto:admin@fixily.net">admin@fixily.net</a>.
                </li>
              </ul>
            </li>
            <li>
              <h3>انتظر التأكيد:</h3>
              <ul className="list-disc ms-8">
                <li>
                  سيقوم فريقنا الإداري بمعالجة طلبك. قد يستغرق هذا بعض الوقت
                  بناءً على حجم الطلبات.
                </li>
                <li>ستتلقى بريدًا إلكترونيًا للتأكيد بمجرد حذف بياناتك.</li>
              </ul>
            </li>
          </ol>

          <h2>ملاحظات هامة:</h2>
          <ul className="list-disc ms-8">
            <li>
              <strong>التحقق:</strong> قد نحتاج إلى التحقق من هويتك لمعالجة
              طلبك. كن مستعدًا لتقديم معلومات إضافية إذا طُلب منك ذلك.
            </li>
            <li>
              <strong>وقت المعالجة:</strong> تتم معالجة طلبات إزالة البيانات
              يدويًا. يرجى السماح بما يصل إلى 30 يومًا لمعالجة طلبك.
            </li>
            <li>
              <strong>سياسات الاحتفاظ بالبيانات:</strong> قد يلزم الاحتفاظ ببعض
              البيانات لأسباب قانونية أو تنظيمية.
            </li>
          </ul>

          <p>
            لمزيد من المساعدة أو الاستفسارات:{" "}
            <a href="mailto:support@fixily.net">support@fixily.net</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DataPolicy;
