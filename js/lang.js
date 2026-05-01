/* ═══════════════════════════════════════════════════════════════
   Roof Care Solution — Bilingual Engine (English / Urdu)
   ═══════════════════════════════════════════════════════════════ */
'use strict';

const RCS_LANG = {

    current: 'en',

    t: {
        en: {
            /* ── Navbar ── */
            'nav.home':       'Home',
            'nav.services':   'Services',
            'nav.process':    'Process',
            'nav.gallery':    'Gallery',
            'nav.contact':    'Contact',
            'nav.quote':      'Get Free Estimate',

            /* ── Hero ── */
            'hero.eyebrow':   "Pakistan's #1 Roofing & Waterproofing Company",
            'hero.title':     'Roof Care Solution<br><em>Pakistan\'s Roofing Experts</em>',
            'hero.body':      'With over 15 years of experience, we deliver professional chemical-based heat proofing and waterproofing solutions across all of Pakistan. Trusted by thousands of homeowners and businesses — backed by a 5-year written warranty.',
            'hero.cta1':      'Get a Free Estimate',
            'hero.cta2':      'Call Now',
            'hero.stat1':     'Projects Completed',
            'hero.stat2':     'Years of Experience',
            'hero.stat3':     'Customer Satisfaction',
            'hero.stat4':     'Years Warranty',
            'hero.scroll':    'Scroll to explore',

            /* ── Services ── */
            'sec.services.tag':  'What We Do',
            'sec.services.h2':   'Our <span class="gradient-text">Premium Services</span>',
            'sec.services.desc': 'Comprehensive chemical roofing solutions backed by 5-year written warranties',

            'svc.heat.title': 'Heat Proofing',
            'svc.heat.desc':  'Reflective chemical coatings that reduce roof temperature by up to 15°C, dramatically cutting AC electricity bills.',
            'svc.heat.f1':    '15°C Temperature Drop',
            'svc.heat.f2':    '30% Energy Savings',
            'svc.heat.f3':    '5-Year Warranty',

            'svc.water.title': 'Waterproofing',
            'svc.water.desc':  'Industrial-grade waterproofing membrane creating an impenetrable barrier against rain, moisture and water seepage.',
            'svc.water.f1':    '100% Leak Protection',
            'svc.water.f2':    'Chemical Grade',
            'svc.water.f3':    '5-Year Warranty',

            'svc.seep.title': 'Seepage Treatment',
            'svc.seep.desc':  'Deep-penetrating chemical formula that permanently stops water seepage from walls, roofs, and basement slabs.',
            'svc.seep.f1':    'Deep Penetration',
            'svc.seep.f2':    'Wall & Roof',
            'svc.seep.f3':    'Permanent Fix',

            'svc.crack.title': 'Roof Crack Repair',
            'svc.crack.desc':  'Expert crack filling with flexible weather-resistant sealants that expand and contract with temperature variations.',
            'svc.crack.f1':    'Flexible Sealant',
            'svc.crack.f2':    'All Crack Sizes',
            'svc.crack.f3':    'Weather Resistant',

            'svc.tank.title': 'Tank Leakage Repair',
            'svc.tank.desc':  'Specialized food-grade sealants for water storage tanks — safe for drinking water, fast-curing, and durable.',
            'svc.tank.f1':    'Food-Grade Safe',
            'svc.tank.f2':    'All Tank Types',
            'svc.tank.f3':    'Instant Sealing',

            'svc.wall.title': 'Wall Waterproofing',
            'svc.wall.desc':  'External and internal waterproofing for old houses. Restore damaged walls and protect from moisture, mold, and salt damage.',
            'svc.wall.f1':    'Internal & External',
            'svc.wall.f2':    'Old House Specialist',
            'svc.wall.f3':    'Mold Prevention',

            'svc.indust.title': 'Industrial Roof Treatment',
            'svc.indust.desc':  'Heavy-duty chemical treatment engineered for factories, warehouses, and commercial rooftops. Handles extreme heat, UV radiation, and structural stress with industrial-grade compounds.',
            'svc.indust.f1':    'Commercial Grade',
            'svc.indust.f2':    'UV & Heat Resistant',
            'svc.indust.f3':    '5-Year Warranty',

            'svc.cool.title': 'Roof Cooling Treatment',
            'svc.cool.desc':  'Advanced heat-reflective coating that bounces solar radiation away from your roof surface, creating a measurable cooling effect and cutting indoor temperatures by up to 20°C.',
            'svc.cool.f1':    'Up to 20°C Reduction',
            'svc.cool.f2':    'Solar Reflective',
            'svc.cool.f3':    'Energy Saving Formula',

            'svc.chem.title': 'Chemical Roof Treatment',
            'svc.chem.desc':  'Full-spectrum multi-layer chemical application using ISO-certified compounds. Combines waterproofing, heat resistance, and structural bonding for complete roof restoration in one treatment.',
            'svc.chem.f1':    'ISO Certified Chemicals',
            'svc.chem.f2':    'Multi-Layer Formula',
            'svc.chem.f3':    'Full Restoration',

            'svc.oldrf.title': 'Old & Damaged Roof Treatment',
            'svc.oldrf.desc':  'Specialized restoration treatment for aging, cracked, or severely deteriorated roofs. Chemically repairs structural weaknesses, seals all damage points, and extends roof life by 10+ years.',
            'svc.oldrf.f1':    'Structural Repair',
            'svc.oldrf.f2':    '10+ Year Life Extension',
            'svc.oldrf.f3':    'Complete Restoration',

            'svc.btn':        'Get Quote',

            /* ── Temperature ── */
            'sec.temp.tag':       'The Science',
            'sec.temp.h2':        'Feel The <span class="gradient-text-cool">Difference</span>',
            'sec.temp.desc':      'Our heat proofing technology delivers measurable, dramatic temperature reduction',
            'temp.before':        'BEFORE TREATMENT',
            'temp.after':         'AFTER TREATMENT',
            'temp.before.desc':   'Extreme heat causes discomfort, high energy bills, and accelerated roof deterioration',
            'temp.after.desc':    'Cool, energy-efficient, comfortable living environment with significant reduction in AC usage',
            'temp.chem':          'Chemical<br>Treatment',
            'temp.stat1':         'Avg. Temperature Reduction',
            'temp.stat2':         'Reduction in AC Bills',
            'temp.stat3':         'Treatment Guarantee',
            'temp.stat4':         'Certified Chemicals',

            /* ── Process ── */
            'sec.proc.tag':  'Our Process',
            'sec.proc.h2':   'How It <span class="gradient-text">Works</span>',
            'sec.proc.desc': 'Our proven 4-step process guarantees perfect results every time',

            'proc.1.title': 'Roof Inspection',
            'proc.1.desc':  'Expert assessment of your roof condition — identifying cracks, seepage points, heat absorption zones, and structural issues.',
            'proc.1.note':  'Free for first-time customers',
            'proc.2.title': 'Surface Cleaning',
            'proc.2.desc':  'High-pressure washing and chemical priming removes dirt, algae, old coating, and contaminants for maximum treatment adhesion.',
            'proc.2.note':  'Industrial-grade equipment',
            'proc.3.title': 'Chemical Application',
            'proc.3.desc':  'Premium heat-reflective and waterproofing chemicals applied in precise multiple layers for complete, uniform coverage.',
            'proc.3.note':  'ISO certified chemicals only',
            'proc.4.title': 'Final Protection',
            'proc.4.desc':  'Final protective topcoat applied. Quality inspection performed. 5-year written warranty documentation handed to client.',
            'proc.4.note':  '5-year warranty included',

            /* ── Gallery ── */
            'sec.gal.tag':  'Our Projects',
            'sec.gal.h2':   'Explore Our <span class="gradient-text">Projects</span>',
            'sec.gal.desc': 'Real roofing projects completed across Pakistan — heat proofing, waterproofing &amp; complete treatments',
            'gal.before':   'BEFORE',
            'gal.after':    'AFTER',
            'gal.1.title':  'DHA Phase 5 Roof',
            'gal.1.svc':    'Heat Proofing + Waterproofing Package',
            'gal.1.loc':    'DHA, Karachi',
            'gal.2.title':  'Gulshan-e-Iqbal Block 13',
            'gal.2.svc':    'Seepage Treatment + Crack Repair',
            'gal.2.loc':    'Gulshan, Karachi',
            'gal.3.title':  'North Nazimabad Block H',
            'gal.3.svc':    'Complete Roof Treatment Package',
            'gal.3.loc':    'N. Nazimabad, Karachi',

            /* ── Coverage ── */
            'sec.cov.tag':    'Where We Work',
            'sec.cov.h2':     'All Pakistan <span class="gradient-text">Services</span>',
            'sec.cov.desc':   'Professional roofing services available across all major cities and towns in Pakistan',
            'cov.dha.sub':    'All Phases',
            'cov.gul.sub':    'All Blocks',
            'cov.nn.sub':     'All Sectors',
            'cov.pec.sub':    'All Blocks',
            'cov.bah.sub':    'Karachi',
            'cov.cli.sub':    'All Areas',
            'cov.def.sub':    'All Phases',
            'cov.more.title': '& More',
            'cov.more.sub':   'All of Pakistan',
            'tag.premium':    'Premium Zone',
            'tag.active':     'Active Zone',
            'tag.citywide':   'Citywide',

            /* ── Trust ── */
            'sec.trust.tag':  'Why Choose Us',
            'sec.trust.h2':   'Trusted by <span class="gradient-text">Thousands</span>',
            'sec.trust.desc': 'Real customers, real projects, real satisfaction across Pakistan',
            'trust.stat1':    'Projects Completed',
            'trust.stat2':    'Customer Satisfaction',
            'trust.stat3':    'In Business',
            'trust.stat4':    'Expert Technicians',
            'warranty.title': '5-Year Written Warranty',
            'warranty.desc':  'Every single project comes with a 5-year written warranty covering all treatments, materials, and workmanship.',
            'seal.label':     'CERTIFIED',
            'rev.1.text':     '"Excellent service! Heat proofing on my 1500 sq ft DHA roof. The temperature difference is remarkable — my rooms stay much cooler. Very professional team."',
            'rev.1.svc':      'Heat Proofing',
            'rev.2.text':     '"Had seepage problems for years. Roof Care Solution fixed it permanently in 2 days. Cleaned up everything after work. 100% recommended!"',
            'rev.2.svc':      'Seepage Treatment',
            'rev.3.text':     '"Got the complete package — waterproofing + heat proofing + crack repair. Best investment for my house. Electricity bills dropped by almost 35%."',
            'rev.3.svc':      'Complete Package',
            'rev.4.text':     '"Water tank was leaking and causing floor damage. They repaired it with food-grade sealant. Very knowledgeable team, explained everything clearly."',
            'rev.4.svc':      'Tank Leakage Repair',
            'rev.5.text':     '"Used them for my 2000 sq ft factory roof. Industrial waterproofing done to absolute perfection. Not a single leak in heavy Karachi rains. Will use again."',
            'rev.5.svc':      'Industrial Waterproofing',

            /* ── Contact ── */
            'sec.con.tag':    'Get In Touch',
            'sec.con.h2':     'Contact <span class="gradient-text">Us Today</span>',
            'sec.con.desc':   'Free roof inspection available — 7 days a week, across all Pakistan',
            'con.left.h3':    "Let's Protect Your Roof",
            'con.left.p':     'Reach out for a free inspection and detailed quote. Our team responds within 1 hour on WhatsApp.',
            'con.phone.h4':   'Call Us',
            'con.wa.h4':      'WhatsApp',
            'con.wa.link':    'Chat on WhatsApp',
            'con.wa.note':    'Responds within 1 hour',
            'con.loc.h4':     'Location',
            'con.loc.val':    'Karachi, Sindh, Pakistan',
            'con.loc.note':   'Serving all of Pakistan',
            'con.hrs.h4':     'Working Hours',
            'con.hrs.val':    'Mon–Sat: 8:00 AM – 8:00 PM',
            'con.hrs.note':   'Sunday by appointment',
            'form.title':     'Get Free Inspection',
            'form.name.lbl':  'Your Name *',
            'form.name.ph':   'Muhammad Ali',
            'form.phone.lbl': 'Phone Number *',
            'form.phone.ph':  '+92 300 0000000',
            'form.email.lbl': 'Email Address',
            'form.email.ph':  'your@email.com',
            'form.svc.lbl':   'Service Required *',
            'form.svc.ph':    'Select Service',
            'form.svc.o1':    'Heat Proofing',
            'form.svc.o2':    'Waterproofing',
            'form.svc.o3':    'Seepage Treatment',
            'form.svc.o4':    'Crack Repair',
            'form.svc.o5':    'Tank Leakage',
            'form.svc.o6':    'Complete Package',
            'form.svc.o7':    'Industrial Roof Treatment',
            'form.svc.o8':    'Roof Cooling Treatment',
            'form.svc.o9':    'Chemical Roof Treatment',
            'form.svc.o10':   'Old & Damaged Roof Treatment',
            'form.area.lbl':  'Karachi Area *',
            'form.area.ph':   'Select Area',
            'form.area.o1':   'DHA',
            'form.area.o2':   'Gulshan-e-Iqbal',
            'form.area.o3':   'North Nazimabad',
            'form.area.o4':   'PECHS',
            'form.area.o5':   'Bahria Town',
            'form.area.o6':   'Clifton',
            'form.area.o7':   'Defence View',
            'form.area.o8':   'Other',
            'form.msg.lbl':   'Message',
            'form.msg.ph':    'Describe your roofing issue or any specific requirements...',
            'form.submit':    'Send Inquiry',
            'form.ok.title':  'Thank you!',
            'form.ok.note':   "We'll contact you within 24 hours.",

            /* ── Footer ── */
            'ft.desc':      "Pakistan's trusted premium roofing specialists. 15 years of experience in chemical-based heat proofing, waterproofing & complete roof treatments — with 5-year written warranty.",
            'ft.svc.head':  'Services',
            'ft.svc.1':     'Heat Proofing',
            'ft.svc.2':     'Waterproofing',
            'ft.svc.3':     'Seepage Treatment',
            'ft.svc.4':     'Crack Repair',
            'ft.svc.5':     'Tank Leakage',
            'ft.svc.6':     'Wall Waterproofing',
            'ft.svc.7':     'Industrial Roof Treatment',
            'ft.svc.8':     'Roof Cooling Treatment',
            'ft.svc.9':     'Chemical Roof Treatment',
            'ft.svc.10':    'Old & Damaged Roof Treatment',
            'ft.cov.head':  'Coverage Areas',
            'ft.con.head':  'Contact',
            'ft.wa':        'WhatsApp Us',
            'ft.warranty':  '5-Year Warranty',
            'ft.copy':      '© 2025 Roof Care Solution. All Rights Reserved. | Professional Roofing Services Across Pakistan',
            'wa.float':     'Chat with us',
        },

        ur: {
            /* ── Navbar ── */
            'nav.home':       'گھر',
            'nav.services':   'خدمات',
            'nav.process':    'طریقہ کار',
            'nav.gallery':    'گیلری',
            'nav.contact':    'رابطہ',
            'nav.quote':      'مفت اندازہ',

            /* ── Hero ── */
            'hero.eyebrow':   'پاکستان کی نمبر ایک چھت اور واٹرپروفنگ کمپنی',
            'hero.title':     'روف کیئر سولیوشن<br><em>پاکستان کے چھت کے ماہرین</em>',
            'hero.body':      '15 سال سے زائد تجربے کے ساتھ، ہم پاکستان بھر میں پیشہ ورانہ کیمیاوی ہیٹ پروفنگ اور واٹرپروفنگ خدمات فراہم کرتے ہیں۔ ہزاروں گھروں اور کاروباروں کا اعتماد — 5 سال کی تحریری ضمانت کے ساتھ۔',
            'hero.cta1':      'مفت اندازہ لگائیں',
            'hero.cta2':      'ابھی کال کریں',
            'hero.stat1':     'مکمل شدہ منصوبے',
            'hero.stat2':     'سال کا تجربہ',
            'hero.stat3':     'صارف اطمینان',
            'hero.stat4':     'سال کی ضمانت',
            'hero.scroll':    'مزید دیکھیں',

            /* ── Services ── */
            'sec.services.tag':  'ہم کیا کرتے ہیں',
            'sec.services.h2':   'ہماری <span class="gradient-text">پریمیم خدمات</span>',
            'sec.services.desc': '5 سال کی تحریری ضمانت کے ساتھ جامع کیمیاوی چھت حل',

            'svc.heat.title': 'ہیٹ پروفنگ',
            'svc.heat.desc':  'عکاس کیمیاوی کوٹنگ جو چھت کا درجہ حرارت 15°C تک کم کرتی ہے، اے سی کے بجلی بل میں نمایاں کمی لاتی ہے۔',
            'svc.heat.f1':    '15°C درجہ حرارت میں کمی',
            'svc.heat.f2':    '30% توانائی کی بچت',
            'svc.heat.f3':    '5 سال کی ضمانت',

            'svc.water.title': 'واٹرپروفنگ',
            'svc.water.desc':  'صنعتی واٹرپروفنگ جھلی جو بارش، نمی اور پانی کے رسنے کے خلاف ناقابل تسخیر رکاوٹ بناتی ہے۔',
            'svc.water.f1':    '100% لیک سے تحفظ',
            'svc.water.f2':    'کیمیاوی درجہ',
            'svc.water.f3':    '5 سال کی ضمانت',

            'svc.seep.title': 'سیپیج ٹریٹمنٹ',
            'svc.seep.desc':  'گہری اثرانداز ہونے والا کیمیاوی فارمولا جو دیواروں، چھتوں اور تہہ خانوں سے پانی کا رسنا مستقل بند کرتا ہے۔',
            'svc.seep.f1':    'گہری رسائی',
            'svc.seep.f2':    'دیوار اور چھت',
            'svc.seep.f3':    'مستقل حل',

            'svc.crack.title': 'چھت کی دراڑ مرمت',
            'svc.crack.desc':  'لچکدار موسم مزاحم سیلنٹ کے ساتھ دراڑوں کو بھرنا جو درجہ حرارت تبدیلی کے ساتھ پھیلتا اور سکڑتا ہے۔',
            'svc.crack.f1':    'لچکدار سیلنٹ',
            'svc.crack.f2':    'تمام سائز کی دراڑیں',
            'svc.crack.f3':    'موسم مزاحم',

            'svc.tank.title': 'ٹینک لیکیج مرمت',
            'svc.tank.desc':  'پانی ذخیرہ کرنے والے ٹینکوں کے لیے فوڈ گریڈ سیلنٹ — پینے کے پانی کے لیے محفوظ، تیز اور پائیدار۔',
            'svc.tank.f1':    'فوڈ گریڈ محفوظ',
            'svc.tank.f2':    'تمام ٹینک اقسام',
            'svc.tank.f3':    'فوری سیلنگ',

            'svc.wall.title': 'دیوار واٹرپروفنگ',
            'svc.wall.desc':  'پرانے گھروں کے لیے بیرونی اور اندرونی واٹرپروفنگ۔ خراب دیواروں کو بحال کریں اور نمی، پھپھوندی سے بچائیں۔',
            'svc.wall.f1':    'اندرونی اور بیرونی',
            'svc.wall.f2':    'پرانے گھروں کے ماہر',
            'svc.wall.f3':    'پھپھوندی سے بچاؤ',

            'svc.indust.title': 'صنعتی چھت علاج',
            'svc.indust.desc':  'فیکٹریوں، گوداموں اور تجارتی چھتوں کے لیے مضبوط کیمیاوی علاج۔ صنعتی درجے کے مرکبات سے شدید گرمی، الٹرا وائلٹ اور ساختی دباؤ کو سنبھالتا ہے۔',
            'svc.indust.f1':    'تجارتی درجہ',
            'svc.indust.f2':    'UV اور گرمی مزاحم',
            'svc.indust.f3':    '5 سال کی ضمانت',

            'svc.cool.title': 'چھت کولنگ ٹریٹمنٹ',
            'svc.cool.desc':  'جدید حرارت عکاس کوٹنگ جو چھت کی سطح سے شمسی تابکاری کو واپس اچھالتی ہے، قابل پیمائش ٹھنڈک پیدا کرتی ہے اور اندرونی درجہ حرارت 20°C تک کم کرتی ہے۔',
            'svc.cool.f1':    '20°C تک کمی',
            'svc.cool.f2':    'شمسی عکاس',
            'svc.cool.f3':    'توانائی بچانے والا فارمولا',

            'svc.chem.title': 'کیمیاوی چھت علاج',
            'svc.chem.desc':  'ISO تصدیق شدہ مرکبات استعمال کرتے ہوئے مکمل کثیر پرتوں کا کیمیاوی اطلاق۔ ایک ہی علاج میں واٹرپروفنگ، گرمی مزاحمت اور ساختی جوڑ کا مجموعہ۔',
            'svc.chem.f1':    'ISO تصدیق شدہ کیمیکل',
            'svc.chem.f2':    'کثیر پرتوں کا فارمولا',
            'svc.chem.f3':    'مکمل بحالی',

            'svc.oldrf.title': 'پرانی اور خراب چھت کا علاج',
            'svc.oldrf.desc':  'پرانی، شدید ٹوٹی پھوٹی یا بری طرح خستہ چھتوں کے لیے مخصوص بحالی علاج۔ ساختی کمزوریوں کو کیمیاوی طور پر درست کرتا ہے اور چھت کی عمر 10 سال سے زیادہ بڑھاتا ہے۔',
            'svc.oldrf.f1':    'ساختی مرمت',
            'svc.oldrf.f2':    '10+ سال عمر میں اضافہ',
            'svc.oldrf.f3':    'مکمل بحالی',

            'svc.btn':        'قیمت جانیں',

            /* ── Temperature ── */
            'sec.temp.tag':       'سائنس',
            'sec.temp.h2':        'فرق <span class="gradient-text-cool">محسوس کریں</span>',
            'sec.temp.desc':      'ہماری ہیٹ پروفنگ ٹیکنالوجی قابل پیمائش اور ڈرامائی درجہ حرارت میں کمی لاتی ہے',
            'temp.before':        'علاج سے پہلے',
            'temp.after':         'علاج کے بعد',
            'temp.before.desc':   'شدید گرمی تکلیف، بھاری بجلی بل، اور چھت کی تیز خرابی کا سبب بنتی ہے',
            'temp.after.desc':    'ٹھنڈا، توانائی بچانے والا، آرام دہ ماحول — اے سی کا استعمال نمایاں طور پر کم',
            'temp.chem':          'کیمیاوی<br>علاج',
            'temp.stat1':         'اوسط درجہ حرارت میں کمی',
            'temp.stat2':         'اے سی بل میں کمی',
            'temp.stat3':         'علاج کی ضمانت',
            'temp.stat4':         'تصدیق شدہ کیمیکل',

            /* ── Process ── */
            'sec.proc.tag':  'ہمارا طریقہ',
            'sec.proc.h2':   'یہ کیسے <span class="gradient-text">کام کرتا ہے</span>',
            'sec.proc.desc': 'ہمارا ثابت شدہ 4 مرحلہ عمل ہر بار کامل نتائج کی ضمانت دیتا ہے',

            'proc.1.title': 'چھت کا معائنہ',
            'proc.1.desc':  'آپ کی چھت کی حالت کا ماہرانہ جائزہ — دراڑیں، رسنے کے مقامات، گرمی جذب کرنے والے علاقے اور ساختی مسائل کی نشاندہی۔',
            'proc.1.note':  'پہلے صارفین کے لیے مفت',
            'proc.2.title': 'سطح کی صفائی',
            'proc.2.desc':  'ہائی پریشر واشنگ اور کیمیاوی پرائمنگ سے گندگی، کائی اور پرانی کوٹنگ ہٹائی جاتی ہے تاکہ علاج بہترین طریقے سے چپک سکے۔',
            'proc.2.note':  'صنعتی درجے کا آلات',
            'proc.3.title': 'کیمیاوی لگانا',
            'proc.3.desc':  'پریمیم ہیٹ ریفلیکٹیو اور واٹرپروفنگ کیمیکل مکمل یکساں کوریج کے لیے درست متعدد تہوں میں لگائے جاتے ہیں۔',
            'proc.3.note':  'صرف ISO تصدیق شدہ کیمیکل',
            'proc.4.title': 'حتمی تحفظ',
            'proc.4.desc':  'آخری حفاظتی ٹاپ کوٹ لگائی جاتی ہے۔ معیار کی جانچ کی جاتی ہے۔ 5 سال کی تحریری ضمانت کلائنٹ کو دی جاتی ہے۔',
            'proc.4.note':  '5 سال کی ضمانت شامل',

            /* ── Gallery ── */
            'sec.gal.tag':  'ہمارے منصوبے',
            'sec.gal.h2':   'ہمارے <span class="gradient-text">منصوبے دیکھیں</span>',
            'sec.gal.desc': 'پاکستان بھر میں مکمل کیے گئے حقیقی چھت کے منصوبے — ہیٹ پروفنگ، واٹرپروفنگ اور مکمل علاج',
            'gal.before':   'پہلے',
            'gal.after':    'بعد',
            'gal.1.title':  'DHA فیز 5 چھت',
            'gal.1.svc':    'ہیٹ پروفنگ + واٹرپروفنگ پیکج',
            'gal.1.loc':    'DHA، کراچی',
            'gal.2.title':  'گلشن اقبال بلاک 13',
            'gal.2.svc':    'سیپیج ٹریٹمنٹ + دراڑ مرمت',
            'gal.2.loc':    'گلشن، کراچی',
            'gal.3.title':  'نارتھ ناظم آباد بلاک H',
            'gal.3.svc':    'مکمل چھت علاج پیکج',
            'gal.3.loc':    'ن. ناظم آباد، کراچی',

            /* ── Coverage ── */
            'sec.cov.tag':    'ہم کہاں کام کرتے ہیں',
            'sec.cov.h2':     'پورے پاکستان میں <span class="gradient-text">خدمات</span>',
            'sec.cov.desc':   'پاکستان کے تمام بڑے شہروں اور قصبوں میں پیشہ ورانہ چھت خدمات',
            'cov.dha.sub':    'تمام مراحل',
            'cov.gul.sub':    'تمام بلاکس',
            'cov.nn.sub':     'تمام سیکٹر',
            'cov.pec.sub':    'تمام بلاکس',
            'cov.bah.sub':    'کراچی',
            'cov.cli.sub':    'تمام علاقے',
            'cov.def.sub':    'تمام مراحل',
            'cov.more.title': 'اور بھی',
            'cov.more.sub':   'پورا پاکستان',
            'tag.premium':    'پریمیم زون',
            'tag.active':     'فعال زون',
            'tag.citywide':   'پورے پاکستان میں',

            /* ── Trust ── */
            'sec.trust.tag':  'ہمیں کیوں چنیں',
            'sec.trust.h2':   'ہزاروں <span class="gradient-text">کا اعتماد</span>',
            'sec.trust.desc': 'حقیقی صارفین، حقیقی منصوبے، پاکستان بھر میں حقیقی اطمینان',
            'trust.stat1':    'مکمل منصوبے',
            'trust.stat2':    'صارف اطمینان',
            'trust.stat3':    'کاروبار میں',
            'trust.stat4':    'ماہر تکنیشین',
            'warranty.title': '5 سال کی تحریری ضمانت',
            'warranty.desc':  'ہر ایک منصوبے کے ساتھ 5 سال کی تحریری ضمانت ملتی ہے جو تمام علاج، مواد اور کاریگری کو کور کرتی ہے۔',
            'seal.label':     'تصدیق شدہ',
            'rev.1.text':     '"بہترین سروس! میری DHA چھت پر ہیٹ پروفنگ۔ درجہ حرارت کا فرق قابل ذکر ہے — کمرے بہت ٹھنڈے رہتے ہیں۔ انتہائی پیشہ ورانہ ٹیم۔"',
            'rev.1.svc':      'ہیٹ پروفنگ',
            'rev.2.text':     '"برسوں سے سیپیج کا مسئلہ تھا۔ Roof Care Solution نے 2 دن میں مستقل حل کر دیا۔ کام کے بعد سب صاف بھی کیا۔ 100% سفارش کرتا ہوں!"',
            'rev.2.svc':      'سیپیج ٹریٹمنٹ',
            'rev.3.text':     '"مکمل پیکج لیا — واٹرپروفنگ + ہیٹ پروفنگ + دراڑ مرمت۔ گھر کے لیے بہترین سرمایہ کاری۔ بجلی کے بل تقریباً 35% کم ہو گئے۔"',
            'rev.3.svc':      'مکمل پیکج',
            'rev.4.text':     '"پانی کا ٹینک لیک ہو کر فرش خراب کر رہا تھا۔ فوڈ گریڈ سیلنٹ سے ٹھیک کر دیا۔ بہت علم رکھنے والی ٹیم، سب سمجھایا۔"',
            'rev.4.svc':      'ٹینک لیکیج مرمت',
            'rev.5.text':     '"فیکٹری کی چھت کے لیے استعمال کیا۔ صنعتی واٹرپروفنگ بالکل کامل۔ کراچی کی سخت بارش میں ایک بھی قطرہ نہیں آیا۔"',
            'rev.5.svc':      'صنعتی واٹرپروفنگ',

            /* ── Contact ── */
            'sec.con.tag':    'رابطہ کریں',
            'sec.con.h2':     'آج ہم سے <span class="gradient-text">رابطہ کریں</span>',
            'sec.con.desc':   'مفت چھت معائنہ دستیاب ہے — پاکستان بھر میں، ہفتے کے 7 دن',
            'con.left.h3':    'آئیں آپ کی چھت کی حفاظت کریں',
            'con.left.p':     'مفت معائنے اور تفصیلی اندازے کے لیے رابطہ کریں۔ ہماری ٹیم واٹس ایپ پر 1 گھنٹے میں جواب دیتی ہے۔',
            'con.phone.h4':   'فون کریں',
            'con.wa.h4':      'واٹس ایپ',
            'con.wa.link':    'واٹس ایپ پر چیٹ کریں',
            'con.wa.note':    '1 گھنٹے میں جواب',
            'con.loc.h4':     'مقام',
            'con.loc.val':    'کراچی، سندھ، پاکستان',
            'con.loc.note':   'پورے پاکستان میں خدمات',
            'con.hrs.h4':     'کام کے اوقات',
            'con.hrs.val':    'پیر–ہفتہ: صبح 8 بجے – شام 8 بجے',
            'con.hrs.note':   'اتوار بہ وقت اپوائنٹمنٹ',
            'form.title':     'مفت معائنہ حاصل کریں',
            'form.name.lbl':  'آپ کا نام *',
            'form.name.ph':   'محمد علی',
            'form.phone.lbl': 'فون نمبر *',
            'form.phone.ph':  '+92 300 0000000',
            'form.email.lbl': 'ای میل ایڈریس',
            'form.email.ph':  'آپکی@ای میل.com',
            'form.svc.lbl':   'مطلوبہ خدمت *',
            'form.svc.ph':    'خدمت منتخب کریں',
            'form.svc.o1':    'ہیٹ پروفنگ',
            'form.svc.o2':    'واٹرپروفنگ',
            'form.svc.o3':    'سیپیج ٹریٹمنٹ',
            'form.svc.o4':    'دراڑ مرمت',
            'form.svc.o5':    'ٹینک لیکیج',
            'form.svc.o6':    'مکمل پیکج',
            'form.svc.o7':    'صنعتی چھت علاج',
            'form.svc.o8':    'چھت کولنگ ٹریٹمنٹ',
            'form.svc.o9':    'کیمیاوی چھت علاج',
            'form.svc.o10':   'پرانی اور خراب چھت کا علاج',
            'form.area.lbl':  'کراچی علاقہ *',
            'form.area.ph':   'علاقہ منتخب کریں',
            'form.area.o1':   'DHA',
            'form.area.o2':   'گلشن اقبال',
            'form.area.o3':   'نارتھ ناظم آباد',
            'form.area.o4':   'PECHS',
            'form.area.o5':   'بحریہ ٹاؤن',
            'form.area.o6':   'کلفٹن',
            'form.area.o7':   'ڈیفنس ویو',
            'form.area.o8':   'دیگر',
            'form.msg.lbl':   'پیغام',
            'form.msg.ph':    'اپنے چھت کے مسئلے یا کسی مخصوص ضرورت کی وضاحت کریں...',
            'form.submit':    'انکوائری بھیجیں',
            'form.ok.title':  'شکریہ!',
            'form.ok.note':   'ہم 24 گھنٹوں میں آپ سے رابطہ کریں گے۔',

            /* ── Footer ── */
            'ft.desc':      'پاکستان کے قابل اعتماد پریمیم چھت کے ماہرین۔ 15 سال کے تجربے کے ساتھ کیمیاوی ہیٹ پروفنگ، واٹرپروفنگ اور مکمل چھت علاج — 5 سال کی تحریری ضمانت کے ساتھ۔',
            'ft.svc.head':  'خدمات',
            'ft.svc.7':     'صنعتی چھت علاج',
            'ft.svc.8':     'چھت کولنگ ٹریٹمنٹ',
            'ft.svc.9':     'کیمیاوی چھت علاج',
            'ft.svc.10':    'پرانی اور خراب چھت کا علاج',
            'ft.svc.1':     'ہیٹ پروفنگ',
            'ft.svc.2':     'واٹرپروفنگ',
            'ft.svc.3':     'سیپیج ٹریٹمنٹ',
            'ft.svc.4':     'دراڑ مرمت',
            'ft.svc.5':     'ٹینک لیکیج',
            'ft.svc.6':     'دیوار واٹرپروفنگ',
            'ft.cov.head':  'کوریج علاقے',
            'ft.con.head':  'رابطہ',
            'ft.wa':        'واٹس ایپ کریں',
            'ft.warranty':  '5 سال کی ضمانت',
            'ft.copy':      '© 2025 Roof Care Solution. جملہ حقوق محفوظ ہیں۔ | پاکستان بھر میں پیشہ ورانہ چھت خدمات',
            'wa.float':     'ہم سے چیٹ کریں',
        }
    },

    /* ─── Apply a language ─── */
    apply(lang) {
        this.current = lang;
        localStorage.setItem('rcs-lang', lang);
        const isUr = lang === 'ur';

        /* Document direction & lang */
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', isUr ? 'rtl' : 'ltr');
        document.body.classList.toggle('lang-ur', isUr);

        const dict = this.t[lang];

        /* textContent elements */
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const v = dict[el.dataset.i18n];
            if (v !== undefined) el.textContent = v;
        });

        /* innerHTML elements (gradient spans, br tags, em tags) */
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const v = dict[el.dataset.i18nHtml];
            if (v !== undefined) el.innerHTML = v;
        });

        /* placeholder attributes */
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const v = dict[el.dataset.i18nPh];
            if (v !== undefined) el.placeholder = v;
        });

        /* toggle button active state */
        document.querySelectorAll('.lt-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    },

    /* ─── Init ─── */
    init() {
        const saved = localStorage.getItem('rcs-lang') || 'en';
        this.apply(saved);

        document.querySelectorAll('.lt-btn').forEach(btn => {
            btn.addEventListener('click', () => this.apply(btn.dataset.lang));
        });
    }
};

document.addEventListener('DOMContentLoaded', () => RCS_LANG.init());
