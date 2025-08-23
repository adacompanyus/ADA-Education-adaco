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
  ]
};