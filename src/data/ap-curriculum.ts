export interface CurriculumUnit {
  id: string;
  name: string;
  flashcards: Array<{
    front: string;
    back: string;
  }>;
}

export interface APCurriculum {
  [subject: string]: CurriculumUnit[];
}

export const AP_CURRICULUM: APCurriculum = {
  "AP Calculus AB": [
    {
      id: "limits-continuity",
      name: "Limits and Continuity",
      flashcards: [
        { front: "What is the limit of (sin x)/x as x approaches 0?", back: "1" },
        { front: "Define continuity at a point", back: "A function is continuous at x=c if lim(x→c) f(x) = f(c)" },
        { front: "What is the Intermediate Value Theorem?", back: "If f is continuous on [a,b] and k is between f(a) and f(b), then there exists c in (a,b) such that f(c) = k" },
        { front: "What makes a function discontinuous?", back: "Jump, removable, or infinite discontinuities" },
        { front: "How do you find a limit algebraically?", back: "Direct substitution, factoring, rationalizing, or L'Hôpital's rule" },
      ]
    },
    {
      id: "derivatives",
      name: "Derivatives",
      flashcards: [
        { front: "What is the derivative of x²?", back: "2x" },
        { front: "What is the power rule?", back: "d/dx[xⁿ] = nxⁿ⁻¹" },
        { front: "What is the product rule?", back: "d/dx[uv] = u'v + uv'" },
        { front: "What is the quotient rule?", back: "d/dx[u/v] = (u'v - uv')/v²" },
        { front: "What is the chain rule?", back: "d/dx[f(g(x))] = f'(g(x)) × g'(x)" },
      ]
    },
    {
      id: "applications-derivatives",
      name: "Applications of Derivatives",
      flashcards: [
        { front: "What is the Mean Value Theorem?", back: "If f is continuous on [a,b] and differentiable on (a,b), then ∃c: f'(c) = [f(b)-f(a)]/(b-a)" },
        { front: "How do you find critical points?", back: "Set f'(x) = 0 or where f'(x) is undefined" },
        { front: "What is the first derivative test?", back: "If f'(x) changes from + to -, then f(c) is a local max. If f'(x) changes from - to +, then f(c) is a local min" },
        { front: "What is the second derivative test?", back: "If f'(c) = 0 and f''(c) > 0, then f(c) is a local min. If f''(c) < 0, then f(c) is a local max" },
        { front: "How do you solve optimization problems?", back: "Find constraint, express objective function, find critical points, test endpoints" },
      ]
    },
    {
      id: "integrals",
      name: "Integrals",
      flashcards: [
        { front: "What is the integral of 2x?", back: "x² + C" },
        { front: "What is the Fundamental Theorem of Calculus Part 1?", back: "If F(x) = ∫ₐˣ f(t)dt, then F'(x) = f(x)" },
        { front: "What is the Fundamental Theorem of Calculus Part 2?", back: "∫ₐᵇ f(x)dx = F(b) - F(a) where F'(x) = f(x)" },
        { front: "What is u-substitution?", back: "A method for integration where u = g(x) and du = g'(x)dx" },
        { front: "How do you integrate by parts?", back: "∫udv = uv - ∫vdu" },
      ]
    },
    {
      id: "applications-integrals",
      name: "Applications of Integrals",
      flashcards: [
        { front: "How do you find area between curves?", back: "∫ₐᵇ |f(x) - g(x)|dx where f(x) ≥ g(x)" },
        { front: "What is the disk method for volume?", back: "V = π∫ₐᵇ [R(x)]²dx when rotating around x-axis" },
        { front: "What is the washer method?", back: "V = π∫ₐᵇ ([R(x)]² - [r(x)]²)dx for hollow regions" },
        { front: "How do you find arc length?", back: "L = ∫ₐᵇ √(1 + (dy/dx)²)dx" },
        { front: "What is average value of a function?", back: "f̄ = (1/(b-a))∫ₐᵇ f(x)dx" },
      ]
    }
  ],
  
  "AP Biology": [
    {
      id: "chemistry-of-life",
      name: "Chemistry of Life",
      flashcards: [
        { front: "What are the four major biological macromolecules?", back: "Carbohydrates, lipids, proteins, and nucleic acids" },
        { front: "What is the structure of water that makes it polar?", back: "Bent shape with oxygen more electronegative than hydrogen" },
        { front: "What are the four levels of protein structure?", back: "Primary, secondary, tertiary, and quaternary" },
        { front: "What is the difference between saturated and unsaturated fats?", back: "Saturated fats have no double bonds; unsaturated fats have double bonds" },
        { front: "What is the central dogma of molecular biology?", back: "DNA → RNA → Protein" },
      ]
    },
    {
      id: "cell-structure",
      name: "Cell Structure and Function",
      flashcards: [
        { front: "What is the difference between prokaryotes and eukaryotes?", back: "Prokaryotes lack membrane-bound nucleus; eukaryotes have one" },
        { front: "What is the function of the mitochondria?", back: "Cellular respiration and ATP production" },
        { front: "What does the endoplasmic reticulum do?", back: "Rough ER: protein synthesis; Smooth ER: lipid synthesis" },
        { front: "What is the cell theory?", back: "All living things are made of cells, cells are basic unit of life, cells come from cells" },
        { front: "What is the function of ribosomes?", back: "Protein synthesis by translating mRNA" },
      ]
    },
    {
      id: "cellular-energetics",
      name: "Cellular Energetics",
      flashcards: [
        { front: "What is ATP?", back: "Adenosine triphosphate - the energy currency of cells" },
        { front: "Define photosynthesis", back: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂" },
        { front: "What is cellular respiration?", back: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP" },
        { front: "Where does glycolysis occur?", back: "Cytoplasm" },
        { front: "What is chemiosmosis?", back: "Process of ATP synthesis driven by proton gradient across membrane" },
      ]
    },
    {
      id: "cell-communication",
      name: "Cell Communication and Cell Cycle",
      flashcards: [
        { front: "What is mitosis?", back: "Cell division that produces two identical diploid cells" },
        { front: "What are the phases of mitosis?", back: "Prophase, metaphase, anaphase, telophase" },
        { front: "What is meiosis?", back: "Cell division that produces four genetically different haploid gametes" },
        { front: "What are checkpoints in cell cycle?", back: "G1/S, G2/M, and spindle checkpoints that ensure proper cell division" },
        { front: "What is apoptosis?", back: "Programmed cell death" },
      ]
    },
    {
      id: "heredity",
      name: "Heredity",
      flashcards: [
        { front: "What is Mendel's Law of Segregation?", back: "Alleles separate during gamete formation" },
        { front: "What is independent assortment?", back: "Genes for different traits are inherited independently" },
        { front: "What is a test cross?", back: "Cross between unknown genotype and homozygous recessive" },
        { front: "What is codominance?", back: "Both alleles are expressed equally (like AB blood type)" },
        { front: "What is sex-linkage?", back: "Genes located on sex chromosomes, usually X-chromosome" },
      ]
    },
    {
      id: "gene-expression",
      name: "Gene Expression and Regulation",
      flashcards: [
        { front: "What is transcription?", back: "DNA → RNA synthesis in nucleus" },
        { front: "What is translation?", back: "RNA → Protein synthesis at ribosomes" },
        { front: "What is the lac operon?", back: "Prokaryotic gene regulation system for lactose metabolism" },
        { front: "What are enhancers?", back: "DNA sequences that increase transcription when bound by activators" },
        { front: "What is alternative splicing?", back: "Different combinations of exons create different proteins from same gene" },
      ]
    },
    {
      id: "natural-selection",
      name: "Natural Selection",
      flashcards: [
        { front: "What is natural selection?", back: "Process by which organisms with favorable traits survive and reproduce more" },
        { front: "What are the requirements for natural selection?", back: "Variation, heritability, differential reproduction" },
        { front: "What is genetic drift?", back: "Random changes in allele frequencies in small populations" },
        { front: "What is the founder effect?", back: "Genetic drift in newly established populations" },
        { front: "What is gene flow?", back: "Transfer of alleles between populations" },
      ]
    },
    {
      id: "ecology",
      name: "Ecology",
      flashcards: [
        { front: "What is a food chain vs food web?", back: "Chain: linear energy transfer; Web: interconnected feeding relationships" },
        { front: "What is carrying capacity?", back: "Maximum population size an environment can sustain" },
        { front: "What is primary productivity?", back: "Rate at which producers convert energy to biomass" },
        { front: "What are the different types of symbiosis?", back: "Mutualism (+,+), Commensalism (+,0), Parasitism (+,-)" },
        { front: "What is biomagnification?", back: "Concentration of toxins increases up the food chain" },
      ]
    }
  ],
  
  "AP US History": [
    {
      id: "period-1-1491-1607",
      name: "Period 1: 1491-1607",
      flashcards: [
        { front: "What was the Columbian Exchange?", back: "Transfer of plants, animals, diseases between Old and New Worlds after 1492" },
        { front: "What were the main Native American societies in 1491?", back: "Pueblo, Iroquois, Algonquian, and various others with complex political systems" },
        { front: "What motivated European exploration?", back: "God, Gold, Glory - spread Christianity, find wealth, gain national prestige" },
        { front: "What was the encomienda system?", back: "Spanish colonial system granting colonists control over Native American labor and tribute" },
        { front: "How did disease affect Native Americans?", back: "Smallpox, typhus decimated populations with no natural immunity" },
      ]
    },
    {
      id: "period-2-1607-1754",
      name: "Period 2: 1607-1754",
      flashcards: [
        { front: "What was the purpose of Jamestown?", back: "Economic profit through tobacco cultivation" },
        { front: "What was the Great Migration?", back: "20,000 Puritans migrated to Massachusetts Bay Colony 1630-1640" },
        { front: "What was Bacon's Rebellion?", back: "1676 Virginia uprising over Indian policy and political representation" },
        { front: "What was the Middle Passage?", back: "Forced voyage of enslaved Africans across Atlantic" },
        { front: "What was salutary neglect?", back: "British policy of loose control over colonial trade and governance" },
      ]
    },
    {
      id: "period-3-1754-1800",
      name: "Period 3: 1754-1800",
      flashcards: [
        { front: "What caused the Seven Years' War?", back: "Conflict over Ohio River Valley between Britain and France" },
        { front: "What was 'taxation without representation'?", back: "Colonial objection to British taxes without colonial representation in Parliament" },
        { front: "What year was the Declaration of Independence signed?", back: "1776" },
        { front: "What was the Articles of Confederation's main weakness?", back: "Weak central government, no power to tax or regulate commerce" },
        { front: "What was the Great Compromise?", back: "Bicameral legislature: House by population, Senate equal representation" },
      ]
    },
    {
      id: "period-4-1800-1848",
      name: "Period 4: 1800-1848",
      flashcards: [
        { front: "What was the Louisiana Purchase?", back: "1803 land deal doubling US size, purchased from France for $15 million" },
        { front: "What was Manifest Destiny?", back: "Belief that US expansion across continent was justified and inevitable" },
        { front: "What was the Second Great Awakening?", back: "Religious revival emphasizing individual salvation and social reform" },
        { front: "What was the Missouri Compromise?", back: "1820 agreement admitting Missouri as slave state, Maine as free, 36°30' line" },
        { front: "What was Jacksonian Democracy?", back: "Expansion of voting rights to all white men, opposition to elite privilege" },
      ]
    },
    {
      id: "period-5-1844-1877",
      name: "Period 5: 1844-1877",
      flashcards: [
        { front: "What caused the Civil War?", back: "Slavery, states' rights, economic differences between North and South" },
        { front: "What was the Emancipation Proclamation?", back: "1863 order freeing slaves in rebellious states" },
        { front: "What was Reconstruction?", back: "Post-Civil War period rebuilding South and defining rights of freed slaves" },
        { front: "What were Black Codes?", back: "Southern laws restricting rights of freed slaves" },
        { front: "What ended Reconstruction?", back: "Compromise of 1877 removed federal troops from South" },
      ]
    },
    {
      id: "period-6-1865-1898",
      name: "Period 6: 1865-1898",
      flashcards: [
        { front: "What was the Gilded Age?", back: "Period of rapid industrialization with significant social problems" },
        { front: "What were robber barons?", back: "Wealthy industrialists who used ruthless business practices" },
        { front: "What was the Homestead Act?", back: "1862 law providing free land to settlers willing to farm it" },
        { front: "What was Social Darwinism?", back: "Application of 'survival of fittest' to justify inequality" },
        { front: "What was the Populist movement?", back: "Farmers' political movement seeking economic and political reforms" },
      ]
    },
    {
      id: "period-7-1890-1945",
      name: "Period 7: 1890-1945",
      flashcards: [
        { front: "What was the Progressive Era?", back: "Reform movement addressing problems of industrialization and urbanization" },
        { front: "What caused US entry into WWI?", back: "Zimmermann Telegram, unrestricted submarine warfare, economic ties" },
        { front: "What was the Great Depression?", back: "Severe economic downturn from 1929-1939" },
        { front: "What was the New Deal?", back: "FDR's programs to address Great Depression through Relief, Recovery, Reform" },
        { front: "What caused US entry into WWII?", back: "Pearl Harbor attack December 7, 1941" },
      ]
    },
    {
      id: "period-8-1945-1980",
      name: "Period 8: 1945-1980",
      flashcards: [
        { front: "What was the Cold War?", back: "Ideological and political tension between US and Soviet Union" },
        { front: "What was containment?", back: "US policy to prevent spread of communism" },
        { front: "What was Brown v. Board?", back: "1954 Supreme Court case declaring school segregation unconstitutional" },
        { front: "What was the Civil Rights Act of 1964?", back: "Landmark legislation outlawing discrimination based on race, color, religion, sex, national origin" },
        { front: "What was the Great Society?", back: "LBJ's domestic programs fighting poverty and racial injustice" },
      ]
    },
    {
      id: "period-9-1980-present",
      name: "Period 9: 1980-Present",
      flashcards: [
        { front: "What was Reaganomics?", back: "Conservative economic policies of tax cuts, deregulation, reduced social spending" },
        { front: "What ended the Cold War?", back: "Soviet economic problems, Berlin Wall fall 1989, USSR dissolution 1991" },
        { front: "What was 9/11?", back: "September 11, 2001 terrorist attacks on World Trade Center and Pentagon" },
        { front: "What was the 2008 Financial Crisis?", back: "Economic recession caused by housing bubble and risky lending practices" },
        { front: "What is political polarization?", back: "Increasing ideological division between political parties and voters" },
      ]
    }
  ],
  
  "AP Chemistry": [
    {
      id: "atomic-structure",
      name: "Atomic Structure and Properties",
      flashcards: [
        { front: "What is Avogadro's number?", back: "6.022 × 10²³ particles per mole" },
        { front: "What is the electron configuration of carbon?", back: "1s² 2s² 2p²" },
        { front: "What is Coulomb's Law?", back: "F = k(q₁q₂)/r² - force between charged particles" },
        { front: "What is the photoelectric effect?", back: "Electrons ejected from metal surface when light of sufficient frequency hits it" },
        { front: "What is Hund's Rule?", back: "Electrons fill orbitals singly before pairing up" },
      ]
    },
    {
      id: "molecular-bonding",
      name: "Molecular and Ionic Compound Structure and Properties",
      flashcards: [
        { front: "What is electronegativity?", back: "Tendency of atom to attract electrons in chemical bond" },
        { front: "What is VSEPR theory?", back: "Valence Shell Electron Pair Repulsion - predicts molecular geometry" },
        { front: "What is hybridization in methane?", back: "sp³ hybridization creates tetrahedral geometry" },
        { front: "What are London dispersion forces?", back: "Weak intermolecular forces due to temporary dipoles" },
        { front: "What is hydrogen bonding?", back: "Strong dipole interaction when H is bonded to N, O, or F" },
      ]
    },
    {
      id: "intermolecular-forces",
      name: "Intermolecular Forces and Properties",
      flashcards: [
        { front: "What affects boiling point?", back: "Strength of intermolecular forces" },
        { front: "What is vapor pressure?", back: "Pressure exerted by vapor in equilibrium with liquid" },
        { front: "What is surface tension?", back: "Energy required to increase surface area of liquid" },
        { front: "What is the phase diagram?", back: "Graph showing phases of matter vs temperature and pressure" },
        { front: "What is sublimation?", back: "Direct transition from solid to gas phase" },
      ]
    },
    {
      id: "chemical-reactions",
      name: "Chemical Reactions",
      flashcards: [
        { front: "What is a synthesis reaction?", back: "A + B → AB" },
        { front: "What is a combustion reaction?", back: "Hydrocarbon + O₂ → CO₂ + H₂O" },
        { front: "What is oxidation?", back: "Loss of electrons, increase in oxidation number" },
        { front: "What is reduction?", back: "Gain of electrons, decrease in oxidation number" },
        { front: "How do you balance redox reactions?", back: "Balance atoms, then electrons using half-reactions" },
      ]
    },
    {
      id: "kinetics",
      name: "Kinetics",
      flashcards: [
        { front: "What is reaction rate?", back: "Change in concentration over time" },
        { front: "What factors affect reaction rate?", back: "Concentration, temperature, surface area, catalysts" },
        { front: "What is activation energy?", back: "Minimum energy needed for reaction to occur" },
        { front: "What does a catalyst do?", back: "Lowers activation energy, increases reaction rate" },
        { front: "What is the rate law?", back: "Rate = k[A]ᵐ[B]ⁿ where m,n are orders" },
      ]
    },
    {
      id: "thermodynamics",
      name: "Thermodynamics",
      flashcards: [
        { front: "What is the first law of thermodynamics?", back: "Energy cannot be created or destroyed, only transferred" },
        { front: "What is enthalpy (H)?", back: "Heat content of system at constant pressure" },
        { front: "What is entropy (S)?", back: "Measure of disorder or randomness" },
        { front: "What is Gibbs free energy?", back: "ΔG = ΔH - TΔS, determines spontaneity" },
        { front: "When is a reaction spontaneous?", back: "When ΔG < 0" },
      ]
    },
    {
      id: "equilibrium",
      name: "Equilibrium",
      flashcards: [
        { front: "What is chemical equilibrium?", back: "Forward and reverse reaction rates are equal" },
        { front: "What is the equilibrium constant?", back: "K = [products]/[reactants] at equilibrium" },
        { front: "What is Le Chatelier's Principle?", back: "System shifts to counteract applied stress" },
        { front: "How does temperature affect K?", back: "Increases K for endothermic, decreases K for exothermic" },
        { front: "What is the reaction quotient?", back: "Q compares current concentrations to K" },
      ]
    },
    {
      id: "acids-bases",
      name: "Acids and Bases",
      flashcards: [
        { front: "What is a Brønsted-Lowry acid?", back: "Proton (H⁺) donor" },
        { front: "What is a Brønsted-Lowry base?", back: "Proton (H⁺) acceptor" },
        { front: "What is pH?", back: "pH = -log[H⁺]" },
        { front: "What is a buffer solution?", back: "Solution that resists pH changes when acids/bases added" },
        { front: "What happens at the equivalence point?", back: "Moles of acid equal moles of base in titration" },
      ]
    },
    {
      id: "applications",
      name: "Applications of Chemical Principles",
      flashcards: [
        { front: "What is electrochemistry?", back: "Study of chemical reactions involving electron transfer" },
        { front: "What is a galvanic cell?", back: "Spontaneous redox reaction generates electrical energy" },
        { front: "What is electrolysis?", back: "Non-spontaneous reaction driven by electrical energy" },
        { front: "What is standard reduction potential?", back: "Measure of tendency to gain electrons" },
        { front: "What is the Nernst equation?", back: "E = E° - (RT/nF)lnQ relates potential to concentrations" },
      ]
    }
  ],
  
  "AP Physics 1": [
    {
      id: "kinematics",
      name: "Kinematics",
      flashcards: [
        { front: "What is the difference between speed and velocity?", back: "Speed is scalar (magnitude only), velocity is vector (magnitude and direction)" },
        { front: "What is acceleration?", back: "Rate of change of velocity: a = Δv/Δt" },
        { front: "What is the kinematic equation for displacement?", back: "x = x₀ + v₀t + ½at²" },
        { front: "What is projectile motion?", back: "Motion under constant gravitational acceleration with horizontal and vertical components" },
        { front: "At what angle is projectile range maximum?", back: "45 degrees (in absence of air resistance)" },
      ]
    },
    {
      id: "dynamics",
      name: "Dynamics",
      flashcards: [
        { front: "What is Newton's first law?", back: "Objects at rest stay at rest, objects in motion stay in motion unless acted upon by net force" },
        { front: "What is Newton's second law?", back: "F = ma - net force equals mass times acceleration" },
        { front: "What is Newton's third law?", back: "For every action, there is an equal and opposite reaction" },
        { front: "What is friction?", back: "Force opposing motion between surfaces in contact" },
        { front: "What is the normal force?", back: "Force perpendicular to surface that prevents objects from passing through" },
      ]
    },
    {
      id: "circular-motion",
      name: "Circular Motion and Gravitation",
      flashcards: [
        { front: "What is centripetal acceleration?", back: "a = v²/r directed toward center of circle" },
        { front: "What is centripetal force?", back: "Net force directed toward center causing circular motion" },
        { front: "What is Newton's law of gravitation?", back: "F = Gm₁m₂/r²" },
        { front: "What is orbital velocity?", back: "v = √(GM/r) for circular orbit" },
        { front: "What is gravitational field?", back: "g = GM/r² - gravitational acceleration at distance r" },
      ]
    },
    {
      id: "energy",
      name: "Energy",
      flashcards: [
        { front: "What is kinetic energy?", back: "KE = ½mv² - energy of motion" },
        { front: "What is potential energy?", back: "Stored energy due to position or configuration" },
        { front: "What is gravitational potential energy?", back: "PE = mgh near Earth's surface" },
        { front: "What is the work-energy theorem?", back: "Net work done equals change in kinetic energy" },
        { front: "What is conservation of energy?", back: "Total mechanical energy remains constant without non-conservative forces" },
      ]
    },
    {
      id: "momentum",
      name: "Momentum",
      flashcards: [
        { front: "What is momentum?", back: "p = mv - mass times velocity" },
        { front: "What is impulse?", back: "J = FΔt = Δp - change in momentum" },
        { front: "What is conservation of momentum?", back: "Total momentum remains constant in isolated system" },
        { front: "What is an elastic collision?", back: "Kinetic energy and momentum are both conserved" },
        { front: "What is an inelastic collision?", back: "Momentum conserved but kinetic energy is not" },
      ]
    },
    {
      id: "rotational-motion",
      name: "Rotational Motion",
      flashcards: [
        { front: "What is angular velocity?", back: "ω = θ/t - rate of change of angular position" },
        { front: "What is torque?", back: "τ = rF sin θ - rotational force" },
        { front: "What is moment of inertia?", back: "I - rotational analog of mass, resistance to angular acceleration" },
        { front: "What is rotational kinetic energy?", back: "KE = ½Iω²" },
        { front: "What is angular momentum?", back: "L = Iω - rotational analog of linear momentum" },
      ]
    },
    {
      id: "oscillations",
      name: "Simple Harmonic Motion",
      flashcards: [
        { front: "What is simple harmonic motion?", back: "Periodic motion where acceleration is proportional to displacement" },
        { front: "What is the period of a mass-spring system?", back: "T = 2π√(m/k)" },
        { front: "What is the period of a simple pendulum?", back: "T = 2π√(L/g)" },
        { front: "What is amplitude?", back: "Maximum displacement from equilibrium position" },
        { front: "What is frequency?", back: "f = 1/T - number of cycles per unit time" },
      ]
    },
    {
      id: "waves",
      name: "Mechanical Waves and Sound",
      flashcards: [
        { front: "What is a wave?", back: "Disturbance that transfers energy without transferring matter" },
        { front: "What is wavelength?", back: "Distance between successive identical points on wave" },
        { front: "What is the wave equation?", back: "v = fλ - wave speed equals frequency times wavelength" },
        { front: "What is interference?", back: "Superposition of waves creating constructive or destructive patterns" },
        { front: "What is resonance?", back: "Large amplitude oscillations when driving frequency matches natural frequency" },
      ]
    },
    {
      id: "electricity",
      name: "Electric Charge and Electric Force",
      flashcards: [
        { front: "What is Coulomb's law?", back: "F = kq₁q₂/r² - force between point charges" },
        { front: "What is electric field?", back: "E = F/q - force per unit charge" },
        { front: "What is electric potential?", back: "V = PE/q - potential energy per unit charge" },
        { front: "What is Ohm's law?", back: "V = IR - voltage equals current times resistance" },
        { front: "What is electric power?", back: "P = IV = I²R = V²/R" },
      ]
    },
    {
      id: "circuits",
      name: "DC Circuits",
      flashcards: [
        { front: "What is current?", back: "I = Q/t - charge flow per unit time" },
        { front: "How do you find equivalent resistance in series?", back: "R_total = R₁ + R₂ + R₃ + ..." },
        { front: "How do you find equivalent resistance in parallel?", back: "1/R_total = 1/R₁ + 1/R₂ + 1/R₃ + ..." },
        { front: "What is Kirchhoff's voltage law?", back: "Sum of voltage drops around closed loop equals zero" },
        { front: "What is Kirchhoff's current law?", back: "Current in equals current out at any junction" },
      ]
    }
  ],
  
  "AP English Literature": [
    {
      id: "poetry",
      name: "Poetry Analysis",
      flashcards: [
        { front: "What is iambic pentameter?", back: "Poetic meter with five iambs (unstressed-stressed syllable pairs) per line" },
        { front: "What is a metaphor?", back: "Direct comparison between two unlike things without 'like' or 'as'" },
        { front: "What is a simile?", back: "Comparison using 'like' or 'as'" },
        { front: "What is alliteration?", back: "Repetition of initial consonant sounds" },
        { front: "What is enjambment?", back: "Continuation of sentence beyond end of line, couplet, or stanza" },
      ]
    },
    {
      id: "literary-devices",
      name: "Literary Devices and Techniques",
      flashcards: [
        { front: "What is symbolism?", back: "Use of objects, colors, or actions to represent deeper meanings" },
        { front: "What is irony?", back: "Contrast between expectation and reality" },
        { front: "What is dramatic irony?", back: "Audience knows something characters don't" },
        { front: "What is foreshadowing?", back: "Hints or clues about future events" },
        { front: "What is personification?", back: "Giving human characteristics to non-human things" },
      ]
    },
    {
      id: "prose-fiction",
      name: "Prose Fiction Analysis",
      flashcards: [
        { front: "What is point of view?", back: "Perspective from which story is told (1st, 2nd, 3rd person)" },
        { front: "What is characterization?", back: "Methods author uses to develop character traits" },
        { front: "What is setting?", back: "Time and place where story occurs" },
        { front: "What is theme?", back: "Central message or meaning of literary work" },
        { front: "What is conflict?", back: "Struggle between opposing forces (internal or external)" },
      ]
    },
    {
      id: "drama",
      name: "Drama and Theater",
      flashcards: [
        { front: "What is a soliloquy?", back: "Character speaks thoughts aloud while alone on stage" },
        { front: "What is an aside?", back: "Character speaks directly to audience, other characters can't hear" },
        { front: "What is dramatic structure?", back: "Organization of play: exposition, rising action, climax, falling action, resolution" },
        { front: "What is catharsis?", back: "Emotional release experienced by audience" },
        { front: "What is hubris?", back: "Excessive pride leading to downfall in tragedy" },
      ]
    },
    {
      id: "rhetorical-devices",
      name: "Rhetorical Analysis",
      flashcards: [
        { front: "What is ethos?", back: "Appeal to credibility or character" },
        { front: "What is pathos?", back: "Appeal to emotion" },
        { front: "What is logos?", back: "Appeal to logic and reason" },
        { front: "What is rhetoric?", back: "Art of effective or persuasive speaking/writing" },
        { front: "What is diction?", back: "Author's choice and use of words" },
      ]
    },
    {
      id: "literary-movements",
      name: "Literary Movements and Periods",
      flashcards: [
        { front: "What is Romanticism?", back: "Emphasis on emotion, nature, individualism (late 18th-19th century)" },
        { front: "What is Realism?", back: "Accurate representation of everyday life and social conditions" },
        { front: "What is Modernism?", back: "Experimental techniques, fragmentation, stream of consciousness" },
        { front: "What is the Harlem Renaissance?", back: "African American cultural movement in 1920s Harlem" },
        { front: "What is Postmodernism?", back: "Questions absolute truth, uses irony, pastiche, metafiction" },
      ]
    },
    {
      id: "poetry-forms",
      name: "Poetry Forms and Structure",
      flashcards: [
        { front: "What is a sonnet?", back: "14-line poem with specific rhyme scheme, usually in iambic pentameter" },
        { front: "What is a haiku?", back: "3-line Japanese poem with 5-7-5 syllable pattern" },
        { front: "What is blank verse?", back: "Unrhymed iambic pentameter" },
        { front: "What is free verse?", back: "Poetry without regular meter, rhyme, or structure" },
        { front: "What is a villanelle?", back: "19-line poem with specific repetition pattern and rhyme scheme" },
      ]
    },
    {
      id: "character-analysis",
      name: "Character Development and Motivation",
      flashcards: [
        { front: "What is a protagonist?", back: "Main character, usually the 'hero' of the story" },
        { front: "What is an antagonist?", back: "Character or force opposing the protagonist" },
        { front: "What is a foil?", back: "Character who contrasts with another to highlight qualities" },
        { front: "What is a dynamic character?", back: "Character who undergoes significant change" },
        { front: "What is a static character?", back: "Character who remains essentially unchanged" },
      ]
    },
    {
      id: "themes-motifs",
      name: "Themes and Motifs",
      flashcards: [
        { front: "What is a motif?", back: "Recurring element that has symbolic significance" },
        { front: "What is allegory?", back: "Extended metaphor where characters/events represent ideas/principles" },
        { front: "What is archetypal criticism?", back: "Analysis based on universal patterns and symbols" },
        { front: "What is the hero's journey?", back: "Common narrative pattern of departure, initiation, return" },
        { front: "What is bildungsroman?", back: "Coming-of-age story showing character's psychological/moral development" },
      ]
    }
  ],

  "AP Calculus BC": [
    {
      id: "limits-continuity-advanced",
      name: "Advanced Limits and Continuity",
      flashcards: [
        { front: "What is L'Hôpital's Rule?", back: "If lim f(x)/g(x) is indeterminate (0/0 or ∞/∞), then lim f(x)/g(x) = lim f'(x)/g'(x)" },
        { front: "What is the squeeze theorem?", back: "If f(x) ≤ g(x) ≤ h(x) and lim f(x) = lim h(x) = L, then lim g(x) = L" },
        { front: "How do you find limits at infinity?", back: "Look at highest degree terms in numerator and denominator" },
        { front: "What is a removable discontinuity?", back: "A hole in the graph where limit exists but function is undefined" },
        { front: "What is the epsilon-delta definition of a limit?", back: "For every ε > 0, there exists δ > 0 such that |f(x) - L| < ε when 0 < |x - c| < δ" },
      ]
    },
    {
      id: "series-sequences",
      name: "Sequences and Series",
      flashcards: [
        { front: "What is a geometric series?", back: "Series of form Σar^n, converges if |r| < 1 to a/(1-r)" },
        { front: "What is the ratio test?", back: "If lim |aₙ₊₁/aₙ| = L < 1, series converges; L > 1, diverges; L = 1, inconclusive" },
        { front: "What is Taylor series?", back: "f(x) = Σ [f^(n)(a)/n!](x-a)^n for x near a" },
        { front: "What is Maclaurin series?", back: "Taylor series centered at a = 0" },
        { front: "What is alternating series test?", back: "If |aₙ| decreases and lim aₙ = 0, then Σ(-1)ⁿaₙ converges" },
      ]
    },
    {
      id: "parametric-polar",
      name: "Parametric and Polar",
      flashcards: [
        { front: "How do you find dy/dx for parametric equations?", back: "dy/dx = (dy/dt)/(dx/dt)" },
        { front: "What is arc length for parametric curves?", back: "L = ∫√((dx/dt)² + (dy/dt)²)dt" },
        { front: "How do you convert polar to rectangular?", back: "x = r cos θ, y = r sin θ" },
        { front: "What is area in polar coordinates?", back: "A = (1/2)∫r² dθ" },
        { front: "How do you find slope of polar curve?", back: "dy/dx = (dr/dθ sin θ + r cos θ)/(dr/dθ cos θ - r sin θ)" },
      ]
    }
  ],

  "AP Statistics": [
    {
      id: "data-analysis",
      name: "Exploring Data",
      flashcards: [
        { front: "What is the difference between mean and median?", back: "Mean is average; median is middle value when ordered" },
        { front: "What is standard deviation?", back: "Measure of spread; average distance from mean" },
        { front: "What is the interquartile range (IQR)?", back: "Q3 - Q1; range of middle 50% of data" },
        { front: "What makes a distribution skewed right?", back: "Tail extends to right; mean > median" },
        { front: "What is correlation coefficient?", back: "Measure of linear relationship strength, ranges from -1 to 1" },
      ]
    },
    {
      id: "sampling-experiments",
      name: "Sampling and Experimentation",
      flashcards: [
        { front: "What is simple random sampling?", back: "Every individual has equal chance of selection" },
        { front: "What is stratified sampling?", back: "Population divided into strata, then random sample from each" },
        { front: "What is the difference between observational study and experiment?", back: "Experiment assigns treatments; observational study observes existing conditions" },
        { front: "What is a confounding variable?", back: "Variable that affects response and is associated with explanatory variable" },
        { front: "What is randomization in experiments?", back: "Random assignment of treatments to reduce bias" },
      ]
    },
    {
      id: "probability",
      name: "Probability",
      flashcards: [
        { front: "What is the complement rule?", back: "P(A') = 1 - P(A)" },
        { front: "What is the multiplication rule for independent events?", back: "P(A and B) = P(A) × P(B)" },
        { front: "What is conditional probability?", back: "P(A|B) = P(A and B)/P(B)" },
        { front: "What is Bayes' theorem?", back: "P(A|B) = P(B|A) × P(A)/P(B)" },
        { front: "What is the law of large numbers?", back: "As sample size increases, sample proportion approaches true probability" },
      ]
    },
    {
      id: "statistical-inference",
      name: "Statistical Inference",
      flashcards: [
        { front: "What is a confidence interval?", back: "Range of plausible values for parameter with given confidence level" },
        { front: "What is Type I error?", back: "Rejecting true null hypothesis (false positive)" },
        { front: "What is Type II error?", back: "Failing to reject false null hypothesis (false negative)" },
        { front: "What is p-value?", back: "Probability of observing data at least as extreme given null hypothesis is true" },
        { front: "What increases power of a test?", back: "Larger sample size, larger effect size, higher α level" },
      ]
    }
  ],

  "AP Computer Science A": [
    {
      id: "programming-fundamentals",
      name: "Programming Fundamentals",
      flashcards: [
        { front: "What is a variable in Java?", back: "Container that holds data that can be changed during program execution" },
        { front: "What are the primitive data types in Java?", back: "int, double, boolean, char, byte, short, long, float" },
        { front: "What is the difference between == and .equals()?", back: "== compares references; .equals() compares content" },
        { front: "What is a method?", back: "Named block of code that performs specific task and can be called repeatedly" },
        { front: "What is method overloading?", back: "Multiple methods with same name but different parameter lists" },
      ]
    },
    {
      id: "object-oriented",
      name: "Object-Oriented Programming",
      flashcards: [
        { front: "What is a class?", back: "Blueprint or template for creating objects" },
        { front: "What is an object?", back: "Instance of a class with specific values for attributes" },
        { front: "What is encapsulation?", back: "Hiding internal implementation details using private variables and public methods" },
        { front: "What is inheritance?", back: "Creating new class based on existing class, inheriting its properties and methods" },
        { front: "What is polymorphism?", back: "Ability of objects to take multiple forms through method overriding" },
      ]
    },
    {
      id: "data-structures",
      name: "Data Structures",
      flashcards: [
        { front: "What is an array?", back: "Collection of elements of same type stored in contiguous memory locations" },
        { front: "What is an ArrayList?", back: "Dynamic array that can grow and shrink in size" },
        { front: "How do you declare an array in Java?", back: "int[] arr = new int[size]; or int[] arr = {1, 2, 3};" },
        { front: "What is the difference between array and ArrayList?", back: "Array has fixed size; ArrayList is dynamic and has built-in methods" },
        { front: "What is a 2D array?", back: "Array of arrays, representing data in rows and columns" },
      ]
    },
    {
      id: "algorithms",
      name: "Algorithms and Control Structures",
      flashcards: [
        { front: "What is a for loop?", back: "Loop that repeats code for specified number of iterations" },
        { front: "What is a while loop?", back: "Loop that continues while condition is true" },
        { front: "What is recursion?", back: "Method that calls itself with simpler input until base case is reached" },
        { front: "What is binary search?", back: "Efficient search algorithm that repeatedly divides sorted array in half" },
        { front: "What is selection sort?", back: "Sorting algorithm that repeatedly finds minimum element and places it at beginning" },
      ]
    }
  ],

  "AP Physics 2": [
    {
      id: "thermodynamics",
      name: "Thermodynamics",
      flashcards: [
        { front: "What is the first law of thermodynamics?", back: "Energy cannot be created or destroyed, only converted (ΔU = Q - W)" },
        { front: "What is entropy?", back: "Measure of disorder in a system; always increases in isolated systems" },
        { front: "What is an isothermal process?", back: "Process at constant temperature" },
        { front: "What is an adiabatic process?", back: "Process with no heat transfer (Q = 0)" },
        { front: "What is heat capacity?", back: "Amount of heat needed to raise temperature by 1°C" },
      ]
    },
    {
      id: "electricity-magnetism",
      name: "Electricity and Magnetism",
      flashcards: [
        { front: "What is Coulomb's Law?", back: "F = kq₁q₂/r²; force between charged particles" },
        { front: "What is electric field?", back: "Force per unit charge; E = F/q" },
        { front: "What is Ohm's Law?", back: "V = IR; voltage equals current times resistance" },
        { front: "What is Faraday's Law?", back: "Changing magnetic flux induces EMF" },
        { front: "What is Lenz's Law?", back: "Induced current opposes the change causing it" },
      ]
    },
    {
      id: "waves-optics",
      name: "Waves and Optics",
      flashcards: [
        { front: "What is wave frequency?", back: "Number of waves passing point per second (Hz)" },
        { front: "What is the wave equation?", back: "v = fλ; speed equals frequency times wavelength" },
        { front: "What is interference?", back: "Superposition of waves creating constructive or destructive patterns" },
        { front: "What is refraction?", back: "Bending of waves when entering different medium" },
        { front: "What is Snell's Law?", back: "n₁sinθ₁ = n₂sinθ₂; relates angles and refractive indices" },
      ]
    },
    {
      id: "modern-physics",
      name: "Modern Physics",
      flashcards: [
        { front: "What is the photoelectric effect?", back: "Emission of electrons when light hits metal surface" },
        { front: "What is de Broglie wavelength?", back: "λ = h/p; wavelength associated with moving particles" },
        { front: "What is quantum tunneling?", back: "Particles passing through energy barriers classically impossible" },
        { front: "What is nuclear fission?", back: "Heavy nucleus splits into lighter nuclei, releasing energy" },
        { front: "What is nuclear fusion?", back: "Light nuclei combine to form heavier nucleus, releasing energy" },
      ]
    }
  ],

  "AP World History: Modern": [
    {
      id: "1200-1450",
      name: "Global Tapestry (1200-1450)",
      flashcards: [
        { front: "What was the Silk Road?", back: "Network of trade routes connecting East Asia with Europe and Africa" },
        { front: "What was the Mongol Empire's impact?", back: "Largest contiguous empire; facilitated trade and cultural exchange" },
        { front: "What was the Mali Empire known for?", back: "Gold and salt trade; Mansa Musa's pilgrimage showed immense wealth" },
        { front: "What was the Byzantine Empire?", back: "Eastern Roman Empire centered in Constantinople (modern Istanbul)" },
        { front: "What was feudalism?", back: "Medieval European system of land tenure and personal relationships" },
      ]
    },
    {
      id: "1450-1750",
      name: "Age of Exploration (1450-1750)",
      flashcards: [
        { front: "What caused the Age of Exploration?", back: "Search for spices, gold, glory; technological advances; Ottoman control of trade routes" },
        { front: "What was the Columbian Exchange?", back: "Transfer of plants, animals, diseases between Old and New Worlds" },
        { front: "What was the Atlantic Slave Trade?", back: "Forced migration of 12+ million Africans to Americas" },
        { front: "What was mercantilism?", back: "Economic theory emphasizing exports over imports to accumulate wealth" },
        { front: "What was the Ottoman Empire's millet system?", back: "Administrative system organizing subjects by religious community" },
      ]
    },
    {
      id: "1750-1900",
      name: "Industrial Revolution (1750-1900)",
      flashcards: [
        { front: "What started the Industrial Revolution?", back: "Steam power, textile manufacturing, transportation improvements in Britain" },
        { front: "What was the impact of railroads?", back: "Connected markets, moved raw materials and finished goods, urbanization" },
        { front: "What was New Imperialism?", back: "European colonization of Africa and Asia in late 1800s" },
        { front: "What was the Berlin Conference?", back: "1884-85 meeting where Europeans divided Africa among themselves" },
        { front: "What caused the abolition of slavery?", back: "Enlightenment ideals, economic changes, slave resistance, moral campaigns" },
      ]
    },
    {
      id: "1900-present",
      name: "Modern Era (1900-Present)",
      flashcards: [
        { front: "What caused World War I?", back: "Militarism, alliances, imperialism, nationalism; sparked by assassination of Archduke Franz Ferdinand" },
        { front: "What was the Russian Revolution?", back: "1917 overthrow of Tsar, leading to Bolshevik communist government" },
        { front: "What caused the Great Depression?", back: "Stock market crash, bank failures, overproduction, global economic collapse" },
        { front: "What was decolonization?", back: "Process of colonies gaining independence, especially after WWII" },
        { front: "What is globalization?", back: "Increasing interconnection of world through trade, technology, culture" },
      ]
    }
  ],

  "AP Government and Politics": [
    {
      id: "constitution-federalism",
      name: "Constitution and Federalism",
      flashcards: [
        { front: "What is federalism?", back: "Division of power between national and state governments" },
        { front: "What is separation of powers?", back: "Division of government into legislative, executive, and judicial branches" },
        { front: "What are checks and balances?", back: "System where each branch can limit powers of other branches" },
        { front: "What is the supremacy clause?", back: "Federal law takes precedence over state law when they conflict" },
        { front: "What is judicial review?", back: "Supreme Court's power to declare laws unconstitutional" },
      ]
    },
    {
      id: "civil-rights-liberties",
      name: "Civil Rights and Liberties",
      flashcards: [
        { front: "What is the difference between civil rights and civil liberties?", back: "Liberties protect from government; rights ensure equal treatment" },
        { front: "What is the establishment clause?", back: "Government cannot establish official religion" },
        { front: "What is the free exercise clause?", back: "Government cannot prohibit religious practice" },
        { front: "What is strict scrutiny?", back: "Highest standard of judicial review for fundamental rights" },
        { front: "What is the 14th Amendment?", back: "Equal protection and due process; citizenship definition" },
      ]
    },
    {
      id: "political-participation",
      name: "Political Participation and Behavior",
      flashcards: [
        { front: "What factors affect voter turnout?", back: "Age, education, income, registration requirements, competitive elections" },
        { front: "What is political socialization?", back: "Process by which people acquire political beliefs and values" },
        { front: "What are linkage institutions?", back: "Political parties, interest groups, media, elections that connect people to government" },
        { front: "What is the gender gap?", back: "Difference in voting patterns between men and women" },
        { front: "What is political efficacy?", back: "Belief that political participation can make a difference" },
      ]
    },
    {
      id: "institutions-policy",
      name: "Institutions and Policy Making",
      flashcards: [
        { front: "What is the filibuster?", back: "Senate procedure allowing unlimited debate to delay voting" },
        { front: "What is gerrymandering?", back: "Drawing district boundaries to favor one party" },
        { front: "What is the electoral college?", back: "System for electing president based on state representation" },
        { front: "What is bureaucratic discretion?", back: "Ability of agencies to interpret and implement laws" },
        { front: "What is iron triangle?", back: "Relationship between agency, congressional committee, and interest group" },
      ]
    }
  ],

  "AP Psychology": [
    {
      id: "biological-bases",
      name: "Biological Bases of Behavior",
      flashcards: [
        { front: "What is the function of the hippocampus?", back: "Memory formation and spatial navigation" },
        { front: "What is the difference between sympathetic and parasympathetic nervous systems?", back: "Sympathetic: fight/flight; Parasympathetic: rest/digest" },
        { front: "What is neuroplasticity?", back: "Brain's ability to reorganize and form new neural connections" },
        { front: "What is the function of neurotransmitters?", back: "Chemical messengers that transmit signals between neurons" },
        { front: "What is the role of the amygdala?", back: "Processing emotions, especially fear and aggression" },
      ]
    },
    {
      id: "sensation-perception",
      name: "Sensation and Perception",
      flashcards: [
        { front: "What is the difference between sensation and perception?", back: "Sensation: detecting stimuli; Perception: interpreting sensory information" },
        { front: "What is Weber's Law?", back: "Just noticeable difference is proportional to stimulus intensity" },
        { front: "What is signal detection theory?", back: "Theory explaining how we detect signals amid background noise" },
        { front: "What is the blind spot?", back: "Area where optic nerve connects to retina, no photoreceptors" },
        { front: "What is top-down processing?", back: "Using prior knowledge and expectations to interpret sensory input" },
      ]
    },
    {
      id: "learning-memory",
      name: "Learning and Memory",
      flashcards: [
        { front: "What is classical conditioning?", back: "Learning through association between neutral stimulus and response" },
        { front: "What is operant conditioning?", back: "Learning through consequences (reinforcement/punishment)" },
        { front: "What is the difference between positive and negative reinforcement?", back: "Positive: adding pleasant; Negative: removing unpleasant" },
        { front: "What are the stages of memory?", back: "Encoding, storage, retrieval" },
        { front: "What is the serial position effect?", back: "Better recall for items at beginning (primacy) and end (recency) of list" },
      ]
    },
    {
      id: "cognitive-development",
      name: "Cognitive Psychology and Development",
      flashcards: [
        { front: "What are Piaget's stages of cognitive development?", back: "Sensorimotor, preoperational, concrete operational, formal operational" },
        { front: "What is object permanence?", back: "Understanding that objects continue to exist when not visible" },
        { front: "What is theory of mind?", back: "Ability to understand that others have beliefs different from one's own" },
        { front: "What is confirmation bias?", back: "Tendency to search for information that confirms existing beliefs" },
        { front: "What is the availability heuristic?", back: "Judging probability by how easily examples come to mind" },
      ]
    }
  ]
};