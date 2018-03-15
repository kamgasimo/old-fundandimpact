import Vue from 'vue'
import MultiLanguage from 'vue-multilanguage'

Vue.use(MultiLanguage, {
	default: 'en',
	en: {
		hi: 'Hi',
		welcome: 'Welcome, {name}'
	},
	fr: {
		hi: 'Salut',
		welcome: 'Bienvenue, {name}',
    help_desk: 'Bureau D\'aide',
    new_campaign: 'Nouvelle Campagne',
    home: 'Accueil',
    fundraising_ideas: 'Idées de collecte de fonds',
    how_it_works: 'Comment ça marche',
    help: 'Aidez-moi',
    login: 'S\'identifier',
    create_account: 'Créer un compte',
    start_a_fundraiser: 'Démarrer une collecte de fonds',
    mail_us_today: 'Envoyez-nous un courriel aujourd\'hui',
    call_us_for_more_details: 'Appelez nous pour plus de détails!',
    opening_hours: 'Lun-Ven de 8h00 à 18h00',
    dashboard: 'Tableau de bord',
    profile: 'Profil',
    my_donations: 'Mes dons',
    account_settings: 'Paramètres du compte',
    sign_out: 'Déconnexion',
    start_a_campaign: 'Démarrer une Campagne',
    add_a_new_campaign: 'Ajouter une nouvelle campagne',
    share: 'Partager',
    edit: 'Modifier',
    withdraw: 'Retrait',
    more: 'Plus',
    donations: 'Dons',
    comments: 'Commentaires',
    updates: 'Mises à jour',
    view_campaign: 'Voir la Campagne',
    manage_another_campaign: 'Gérer une autre Campagne',
    transfer_money_to_someone_else: 'Transférer de l\'argent à quelqu\'un d\'autre',
    fundandimpact_intro: 'FundAndImpact permet au monde d\'atteindre et d\'influer une vie à la fois en faisant des dons pour aider et apporter des fonds pour des solutions aux problèmes rencontrés dans des campagne. La notion derrière l\'initiative est que, ensemble, un impact plus grand et meilleur peut être créé dans la vie des autres quand nous considérons un problème affectant une personne - comme un problème qui nous affecte tous.',
    read_more: 'Lire la suite',
    get_started: 'Commencer',
    pricing_and_fees: 'Prix et taxes',
    common_questions: 'Questions courantes',
    success_stories: 'Réussites',
    sign_up_now: 'S\'inscrire maintenant',
    terms_of_use: 'Conditions d\'utilisation',
    popular_categories: 'Catégories populaires',
    medical_fundraising: 'Collecte de fonds médicaux',
    memorial_fundraising: 'Collecte de fonds commémoratif',
    charity_fundraising: 'Collecte de fonds de bienfaisance',
    education_fundraising: 'Collecte de fonds pour l\'éducation',
    business_fundraising: 'Collecte de fonds d\'entreprise',
    volunteer_fundraising: 'Collecte de fonds de bénévoles',
    site_language: 'Langue du site',
    quick_contact: 'contact rapide',
    subscribe_to_our_newsletter: 'Abonnez-vous à notre bulletins d\'information',
    powered_by: 'Alimenté par',
    all_rights_reserved: 'Tous les droits sont réservés',
    please_wait_loading_your_data: 'S\'il vous plaît, patientez! Chargement de vos données encours ...',
    impact: 'Impactez',
    charity: 'La Charité',
    health: 'La Santé',
    education: 'L\'Éducation',
    impact_charity_desc: 'Collectez de l\'argent pour vous-même ou pour les services de garde. Collecte de fonds pour améliorer vos conditions de vie.',
    impact_health_desc: 'Collectez de l\'argent pour les frais médicaux et les dépenses. Collecte de fonds pour les factures médicales et les frais médicaux connexes.',
    impact_education_desc: 'Collectez de l\'argent pour l\'éducation. Collecte de fonds pour frais de scolarité et frais d\'études connexes.',
    medical: 'Médical',
    volunteer: 'Bénévole',
    emergencies: 'Urgences',
    memorials: 'Mémoriaux',
    sports: 'Sports',
    animals: 'Animaux',
    wishes: 'Vœux',
    competitions: 'Compétitions',
    other: 'Autre',
    newlyweds: 'Jeunes mariés',
    faith: 'La Foi',
    travel: 'Voyage',
    creative: 'Créatif',
    community: 'Communauté',
    events: 'Événements',
    business: 'Entreprise',
    family: 'Famille',
    latest_campaings: 'campagnes récentes',
    donation_protected_message: 'Votre don est protégé. Si quelque chose n\'est pas correct,<br> nous vous rembourserons.',
    our_followers_say: 'Nos partisans disent',
    our_values: 'Nos valeurs',
    recent_news: 'Nouvelles récentes',
    blog_subscribe_msg: 'Nos dernières publication sur le blog. Pour être mis à jour avec nos dernières nouvelles, événements et promotions',
    likes: 'J\'aime',
    raised: 'Collecté',
    goal: 'Objectif',
    donate: 'Faire un don',
    frequently_asked_questions: 'Questions fréquemment posées.',
    no_question_yet: 'Aucune question pour le moment!',
    ask_one: 'posez une',
		faq_categories: 'Catégories des FAQs',
		fundraising_tips_and_ideas: 'Conseils et idées de collecte de fonds',
		learn_tips_call_msg: 'Découvrez comment organiser une collecte de fonds réussie auprès de nos experts en campagne.',
		learn_more: 'En savoir plus',
		faq_call_msg: 'En savoir plus sur FundAndImpact et comment il peut vous aider à augmenter les fonds.',
		help_center: 'Centre d\'aide',
		no_support_available: 'Nous sommes désolés! Aucun support n\'est disponible pour l\'instant.',
		fundraiser_toolkit: 'Kit de collecte de fonds',
		fundraising_articles: 'Articles de collecte de fonds',
		popular_articles: 'Articles populaires',
		no_article_yet: 'Pas encore d\'article!',
		see_more: 'Voir plus',
		under_this_topic: 'sous ce sujet',
		explore_topics: 'Explorer les sujets',
		watch_the_video: 'Voir la vidéo',
		step_one: 'Première étape',
		create_your_fundandimpact_account: 'Créez votre compte FundAndImpact',
		tour_step_one_msg: 'Commencez par enregistrer un compte avec FundAndImpact',
		step_two: 'Deuxième étape',
		create_your_fundraising_campaign: 'Créez votre campagne de collecte de fonds',
		tour_step_two_msg: 'Il n\'y a pas de moyen plus simple de partager votre histoire et d\'attirer votre soutien.',
		step_three: 'Troisième étape',
		share_with_family_and_friends: 'Partager avec la famille et les amis',
		tour_step_three_msg: 'Nos connexions intégrées à Facebook, Twitter et Email font du partage une brise.',
		step_four: 'Quatrième étape',
		easily_accept_donations: 'Acceptez facilement les dons',
		tour_step_four_msg: 'Recevez votre argent en demandant un chèque ou un virement bancaire.',
		step_five: 'Cinquième étape',
		enjoy_the_results: 'Profitez des résultats',
		tour_step_five_msg: 'Effectuez des modifications, publiez des mises à jour et envoyez des notes de remerciement à partir de votre tableau de bord.',
		pricing_page_header_msg: 'Bien qu\'il soit libre de lancer votre campagne, les frais sont déduits de chaque donation.',
		what_you_get: 'Ce que vous obtenez',
		mobile_friendly_campaigns: 'Campagnes conviviales',
		no_penalties_for_missing_goal: 'Aucune pénalité pour un Objectif manquant',
		fundandimpact_mobile_app: 'Application mobile FundAndImpact',
		no_deathlines_or_goal_requirements: 'Pas de délais ou d\'exigences d\'objectif',
		five_minute_email_support: 'Support de courrier électronique de 5 minutes',
		keep_every_donation_you_receive: 'Conservez chaque don que vous recevez',
		deduction_per_donation: 'Deduction par don',
		fundandimpact_fee: 'Frais de FundAndImpact',
		payment_processing: 'Traitement des paiements',
		per_donation: 'par donation',
		total: 'Total',
		terms_conditions_and_policy: 'Termes, conditions et politique',
		terms_date_revised: 'Date de la dernière révision: 31 août 2017',
		email: 'Email',
		password: 'Mot de passe',
		remember_me: 'Se souvenir de moi',
		sign_into_fundandimpact: 'Connectez-vous à FundAndImpact',
		loading_please_wait: 'Chargement, veuillez patienter!',
		forgot_your_password: 'Mot de passe oublié?',
		dont_have_and_account_register_now: 'Vous n\'avez pas de compte? Inscrivez-vous maintenant.',
		register_get_started_msg: 'Commencez maintenant. Créez et comptez, démarrez une campagne, partagez avec vos amis et recevez des dons.',
		name: 'Noms',
		email_address: 'Adresse e-mail',
		choose_a_username: 'Choisissez un nom d\'utilisateur',
		country: 'Pays',
		please_select_a_country: 'Veuillez sélectionner un pays',
		state_or_region: 'État / Région',
		please_select_a_state: 'Veuillez sélectionner un État',
		city: 'Ville',
		please_select_a_city: 'Veuillez sélectionner une ville',
		phone: 'Téléphone',
		choose_password: 'Choisissez un mot de passe',
		reenter_password: 'Retaper le mot de passe',
		pricing_intro: 'Les frais de FundAndImpact sont de 6% de chaque don que vous recevez. Les frais de traitement des paiements sont de 3% + 0,50 $ par don. En continuant, vous êtes d\'accord avec nos',
		fees: 'frais',
		terms_and_privacy_policy: 'termes et politique de confidentialité.',
		register_now: 'Inscrivez-vous maintenant',
		please_verify_your_phone_number: 'Veuillez vérifier votre numéro de téléphone',
		a_verification_code_was_sent_to: 'Un code de vérification a été envoyé au',
		please_enter_it_below_and_click_on_verify: 'Veuillez l\'entrer ci-dessous et cliquez sur vérifier',
		verify: 'Vérifier',
		please_verify_your_email_address: 'Veuillez vérifier votre adresse e-mail',
		a_confirmation_email_was_sent_to: 'Un e-mail de confirmation a été envoyé à',
		check_your_mails_and_click_on_confirm_email: 'Vérifiez vos mails et cliquez sur "Confirmer Email".',
		not_received_the_mail_msg: 'Vous n\'avez pas reçu le mail? resaisissez votre adresse e-mail ci-dessous et cliquez sur renvoyer',
		resend: 'Renvoyer',
		enter_your_goal: 'entrez votre objectif',
		my_campaign_title: 'Mon titre de campagne',
		category: 'Catégorie',
		zip_or_postal_code: 'Zip / code postal',
		continue: 'Continuer',
		setting_up_your_campaign: 'Configuration de votre campagne',
		changed_your_mind: 'vous avez changé d\'avis?',
		delete_campaign: 'Supprimer la campagne',
		youtube_video_preview: 'Aperçu de vidéo Youtube',
		about_to_add_video_msg: 'Vous êtes sur le point d\'ajouter la vidéo suivante à votre campagne.',
		add_this_video_to_campaign: 'Ajouter cette vidéo à la campagne',
		add_a_photo_or_video: 'Ajouter une photo ou une vidéo',
		photo_from_link: 'Photo d\'un lien',
		photo_from_link_msg: 'Veuillez entrer un lien valide vers votre photo et cliquez sur Ajouter cette photo',
		add_photo: 'Ajouter cette photo',
		upload_photo: 'choisissez la photo',
		youtube_video_link: 'Lien d\'une vidéo YouTube',
		youtube_video_link_msg: 'Veuillez coller votre lien d\'une vidéo YouTube ci-dessous et cliquez sur Ajouter cette vidéo.',
		add_video: 'Ajouter cette vidéo',
		great_campaign_photo_msg: 'De superbes photos aideront votre campagne à amasser plus d\'argent. Une photo ou une vidéo est requise.',
		save_and_continue: 'Sauvegarder et continuer',
		short_introduction_n_characters: 'Brève introduction: 150 - 185 caractères',
		tell_your_story: 'S\'il vous plaît dites votre histoire',
		tips_from_our_campaign_experts: 'Conseils de nos experts de la campagne',
		tips_from_our_campaign_experts_intro: 'Pour récolter le plus d\'argent possible pour une campagne, assurez-vous de:',
		tips_from_our_campaign_experts1: 'Expliquez ce qui est arrivé',
		tips_from_our_campaign_experts2: 'Expliquez quand vous aurez besoin des fonds',
		tips_from_our_campaign_experts3: 'Dites comment ces fonds vous aideront, vous ou votre proche',
		tips_from_our_campaign_experts4: 'Expliquez s\'il y a d\'autres façons d\'aider',
		tips_from_our_campaign_experts5: 'Dites aux donateurs potentiels à quel point votre situation est urgente',
		next: 'Étape suivante',
		campaign_created: 'Campagne créée',
		campaign_is_ready: 'La campagne est prête!',
		your_campaign_is_ready_to_raise_money: 'Votre campagne est prête à amasser des fonds!',
		next_we_will_show_you_how_to_share_your_campaign: 'Ensuite, nous vous montrerons comment partager votre campagne.',
		after_you_receive_your_fist_donation_you_can_enter_your_withdrawal_info: 'Après avoir reçu votre premier don, vous pouvez entrer vos informations de retrait.',
		share_campaign_on_social_networks: 'Partager la campagne sur les réseaux sociaux',
		your_campaign_link_is: 'Le lien de votre campagne est',
		copy_paste_and_share_capaign_link_msg: 'Copiez, collez & partagez votre lien de campagne à l\'intérieur des courriels pour passer le mot.',
		post_an_update: 'postez une mise à jour',
		update_title: 'Titre de mise à jour',
		whats_up: 'Quoi de neuf?',
		post_my_update: 'Publier ma mise à jour',
		of: 'de',
		number_of_donations: 'Nombre de dons',
		created: 'Créé',
		share_on_social_networks: 'Partager sur les réseaux sociaux',
		goal_and_title: 'Objectif & titre',
		photo_or_video: 'Photo ou vidéo',
		story: 'Histoire',
		campaign_setting: 'Paramètre de campagne',
		save_changes: 'Sauvegarder les modifications',
		cancel: 'Annuler',
		dont_worry_you_can_later_change_msg: 'Ne vous inquiétez pas, vous pouvez facilement modifier votre campagne à tout moment.',
		edit_your_photo_or_video: 'Modifier votre photo ou vidéo',
		change_photo_or_replace_with_video: 'Changer de photo ou remplacer par une vidéo',
		change_video_or_replace_with_photo: 'Changer de vidéo ou remplacer par une photo',
		check_your_settings: 'Vérifiez vos paramètres',
		visitor_comments: 'Commentaires des visiteurs',
		on: 'Oui',
		off: 'Non',
		donations_enabled: 'Activer les dons',
		display_on_fundandimpact: 'Afficher sur FundAndImpact?',
		note: 'Remarque:',
		disable_display_msg: 'Si vous désactivez ce paramètre, les utilisateurs ne pourront plus voir Campaign sur FundAndImpact.',
		did_you_know: 'Le saviez-vous?',
		withdrawals_to_a_bank_account_is_currently_unsupported: 'Les retraits sur un compte bancaire ne sont actuellement pas pris en charge.',
		you_currently_can_only_withdraw_to_a_mobile_money_account: 'Vous pouvez actuellement faire un retrait uniquement sur un compte Mobile Money.',
		you_can_withdraw_any_amount_from_your_fundandimpact_account_at_anytime: 'Vous pouvez retirer n\'importe quel montant de votre compte FundAndImpact à tout moment.',
		you_can_also_transfer_money_from_your_fundandimpact_account_to_another_fundAndImpact_user: 'Vous pouvez également transférer de l\'argent de votre compte FundAndImpact à un autre utilisateur FundAndImpact.',
		who_will_be_withdrawing_the_funds: 'Qui va retirer les fonds?',
		select_who_you_would_like_to_withdraw_the_money: 'Sélectionnez qui vous souhaitez retirer l\'argent.',
		someone_else: 'Quelqu\'un d\'autre',
		must_be_a_fundandimpact_member: 'Doit être un membre de FundAndImpact.',
		myself: 'Moi même',
		verification_required: 'Verification requise',
		verification_required_msg: 'FundAndImpact doit collecter ces informations. Il ne sera utilisé que pour vérifier votre identité.',
		your_full_legal_name: 'Votre nom légal complet',
		your_home_address: 'Votre adresse personnelle',
		your_date_of_birth: 'Votre date de naissance',
		national_id_card_number: 'Numéro de carte d\'identité nationale',
		get_money: 'Recevoir de l\'argent',
		how_much_do_you_want_to_withdraw: 'Combien voulez-vous retirer?',
		money_management_system: 'Système de gestion de l\'argent',
		money_raised: 'Argent recueilli',
		total_money_raised: 'Total de l\'argent recueilli',
		all_campaigns: 'Toutes les campagnes',
		total_money_withdrew: 'Total de l\'argent retiré',
		the_sum_of_all_your_withdrawals_are: 'La somme de tous vos retraits sont:',
		total_money_transfered: 'Total de l\'argent transféré',
		the_sum_of_all_your_outgoing_transfers_are: 'La somme de tous vos transferts sortants sont:',
		total_money_received: 'Total de l\'argent reçu',
		the_sum_of_all_your_incomming_transfers_are: 'La somme de tous vos transferts entrants sont:',
		your_balance: 'Votre solde',
		this_is_the_maximun_amount_you_can_withdraw: 'C\'est le montant maximum que vous pouvez retirer:',
		please_provide_your_withdrawal_information: 'Veuillez fournir vos informations de retrait',
		for_a_withdrawal_of: 'pour un retrait de',
		credit_card: 'Carte de crédit',
		mobile_money: 'Mobile Money',
		paypal: 'Paypal',
		with_visa_mastercard_discovery: 'avec Visa, MasterCard, Discovery',
		are_currently_unsupported: 'sont actuellement non pris en charge',
		with_mobile_money: 'avec Mobile Money',
		click_here_to_donate: 'Cliquez ici pour faire un don',
		with_paypal: 'avec Paypal',
		click_here_to_withdraw: 'Cliquez ici pour faire un retrait',
		how_much_do_you_want_to_transfer: 'Combien voulez-vous transférer?',
		money_will_go_to: 'L\'argent ira à ...',
		transfer_money: 'Transférer de l\'argent',
		transferring: 'transfer en cours ...',
		money_transfered: 'L\'argent transféré',
		to_this_person_will_be_deducted_from_your_balance_and_cant_be_recovered: 'à cette personne sera déduit de votre solde et ne peut être récupéré.',
		campaigns_dashboard: 'Tableau de bord des campagnes',
		your_campaings: 'Vos campagnes',
		details: 'Détails',
		manage: 'Gérer',
		view: 'voir',
		you_havent_yet_created_a_campaign: 'Vous n\'avez pas encore créé de campagne.',
		campaign_reviews: 'Revues de campagne',
		options: 'Options',
		refuse_donation: 'Refuser ce don',
		viewing: 'Vous regardez',
		results: 'résultats',
		delete: 'Effacer',
		edit_your_update: 'Modifier votre mise à jour',
		basic_settings: 'Paramètres de base',
		set_your_password: 'Définir votre mot de passe',
		my_campaigns: 'Mes campagnes',
		account_status: 'Statut du compte',
		change_password: 'Changer votre mot de passe',
		to_change_your_fundandimpact_account_password: 'Pour changer le mot de passe de votre compte FundAndImpact',
		click_here: 'cliquez ici',
		password_setting: 'Réglage du mot de passe',
		new_password: 'Nouveau mot de passe',
		current_password: 'Mot de passe actuel',
		manage_your_fundandimpact_campaigns_below: 'Gérez vos campagnes FundAndImpact ci-dessous',
		view_inactive_campaigns: 'Afficher les campagnes inactives',
		view_active_campaigns: 'Afficher les campagnes actives',
		deactivate: 'Désactiver',
		activate: 'Activer',
		create_a_new_campaign: 'Créer une nouvelle campagne',
		status_settings: 'paramètres du status',
		manage_your_fundandimpact_account_status_below: 'Gérez votre statut de compte FundAndImpact ci-dessous.',
		your_account_is_live: 'Votre compte est actif',
		join_date: 'Date d\'inscription',
		feedback: 'Retour d\'information',
		delete_account: 'Supprimer le compte',
		your_donations: 'Vos dons',
		no_donations_yet_find_someone_to_help: 'Pas de dons pour le moment! Trouvez quelqu\'un pour aider!',
		find_a_campaign: 'Trouver une campagne',
		to: 'à',
		campaign: 'Campagne',
		your_activities: 'Vos activités',
		favourite_campaigns: 'Campagnes favorites',
		about_me: 'À propos de moi',
		no_activity: 'Aucune activité',
		you_dont_have_any_activity_yet: 'Vous n\'avez encore aucune activité.',
		donors: 'Donateurs',
		remove: 'Retirer',
		you_havent_yet_added_a_campaign_to_your_favourites: 'Vous n\'avez pas encore ajouté de campagne à vos favoris.',
		your_story: 'Mon histoire',
		edit_story: 'Modifier l\'histoire',
		save_story: 'Enregistrer l\'histoire',
		update: 'Mise à jour',
		recent_updates: 'Mises à jour récentes',
		no_update_have_been_posted_for_this_campaign_yet: 'Aucune mise à jour n\'a encore été publiée pour cette campagne',
		view_recent_updates: 'Voir les mises à jour récentes.',
		view_story: 'Voir l\'histoire',
		recent_comments: 'Commentaires récents',
		leave_a_comment: 'Laissez un commentaire',
		plus_read_more: '+ Lire la suite',
		submit_comment: 'Envoyer le commentaire',
		comments_disabled_by_campaign_owner: 'Commentaires désactivés par le propriétaire de la campagne.',
		donate_now: 'Faire un don maintenant',
		donation_disabled_by_campaign_owner: 'Donations désactivés par le propriétaire de la campagne.',
		add_campaign_to_favourites: 'Ajouter une campagne aux favoris',
		remove_campaign_from_favourites: 'Retirer la campagne des favoris',
		top_supporters: 'Les meilleurs partisans',
		first_donor: 'Premier donateur',
		anonymous: 'Anonyme',
		recent_donations: 'Dons récents',
		no_donation_yet: 'Pas encore de don!',
		login_failed: 'Authentification échouée',
		
	},
})
