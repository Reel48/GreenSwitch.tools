export interface FaqItem {
  question: string;
  answer: string;
}

export const evVsGasFaqs: FaqItem[] = [
  {
    question: "How much money can I save by switching from a gas car to an EV?",
    answer: "The average American driver saves between $800 and $1,500 per year on fuel costs by switching to an EV. The exact savings depend on your state's electricity rates, local gas prices, how many miles you drive, and the efficiency of both vehicles. In states with low electricity rates and high gas prices, savings can exceed $2,000 per year. Over a typical 10-year ownership period, total savings including reduced maintenance can reach $10,000 to $15,000.",
  },
  {
    question: "Are EVs really cheaper to maintain than gas cars?",
    answer: "Yes. EVs have significantly fewer moving parts than internal combustion vehicles. There is no oil to change, no transmission fluid, no spark plugs, and regenerative braking reduces brake pad wear. The average EV owner spends $500 to $700 per year on maintenance compared to $900 to $1,200 for a comparable gas vehicle. The main long-term expense is battery replacement, but most modern EV batteries are warrantied for 8 years or 100,000 miles and are expected to last well beyond that.",
  },
  {
    question: "How does the total cost of ownership compare between an EV and a gas car?",
    answer: "When comparing total cost of ownership over 5 to 10 years, EVs are often less expensive despite higher upfront costs. Factor in federal tax credits of up to $7,500, lower fuel costs, reduced maintenance, and potential state incentives, and many EVs reach cost parity with comparable gas vehicles within 3 to 5 years. The break-even point depends on the specific vehicles being compared, local energy costs, and available incentives.",
  },
  {
    question: "How much does it cost to charge an EV compared to filling up a gas tank?",
    answer: "At the national average electricity rate of about $0.16/kWh, charging an EV costs roughly $0.04 to $0.05 per mile. A gas car averaging 30 MPG at $3.30/gallon costs about $0.11 per mile. For a driver covering 12,000 miles per year, that translates to approximately $600 for EV charging versus $1,320 for gasoline. Charging at home during off-peak hours can reduce costs further, while DC fast charging at public stations is typically more expensive than home charging.",
  },
  {
    question: "Does cold weather significantly impact EV range and costs?",
    answer: "Cold weather can reduce EV range by 20% to 40% depending on temperature and driving conditions. At temperatures below 20 degrees Fahrenheit, some EVs may lose up to a third of their rated range due to battery chemistry and cabin heating demands. However, preconditioning the battery while plugged in, using heated seats instead of cabin heating, and newer heat pump HVAC systems help mitigate these losses. Even with reduced winter efficiency, EVs typically remain cheaper per mile than gas vehicles.",
  },
  {
    question: "Should I buy or lease an EV to maximize savings?",
    answer: "Both options have advantages. Buying allows you to benefit from the full federal tax credit, long-term fuel savings, and eventually owning the vehicle outright. Leasing can be attractive because some manufacturers pass the commercial clean vehicle credit to lessees as a reduced payment, and you avoid concerns about battery degradation or technology becoming outdated. For the best financial outcome, calculate total cost over your expected ownership period using our calculator, which factors in your specific driving habits, local energy costs, and available incentives.",
  },
];

export const solarPaybackFaqs: FaqItem[] = [
  {
    question: "How long does it take for solar panels to pay for themselves?",
    answer: "The average solar panel payback period in the United States is 7 to 12 years, depending on your location, electricity rates, system size, and available incentives. States with high electricity rates like California, Massachusetts, and Connecticut tend to have shorter payback periods of 5 to 8 years. After the payback period, your solar panels generate essentially free electricity for their remaining lifespan, which is typically 25 to 30 years or more.",
  },
  {
    question: "How much does a residential solar panel system cost?",
    answer: "The average cost of a residential solar panel system in the United States ranges from $2.50 to $3.50 per watt before incentives. For a typical 8 kW system, that translates to $20,000 to $28,000 before the 30% federal tax credit. After the federal ITC, the net cost drops to $14,000 to $19,600. Additional state and local incentives can further reduce costs. Prices vary by state, installer, panel brand, and roof complexity.",
  },
  {
    question: "What is the federal solar tax credit and how does it work?",
    answer: "The federal Residential Clean Energy Credit (also known as the solar Investment Tax Credit or ITC) allows you to deduct 30% of the total cost of your solar energy system from your federal income taxes. This includes the cost of panels, inverters, mounting equipment, wiring, and installation labor. There is no maximum amount or income limit. The 30% rate is available through 2032, then drops to 26% in 2033 and 22% in 2034. It is a tax credit, not a deduction, meaning it directly reduces the taxes you owe dollar for dollar.",
  },
  {
    question: "Do solar panels increase my home's value?",
    answer: "Yes. Studies consistently show that homes with solar panels sell for a premium. Research from the Lawrence Berkeley National Laboratory found that solar panels add approximately $4 per watt to a home's value, meaning an 8 kW system could add roughly $32,000 to your home's resale value. In many states, solar panel value additions are exempt from property tax increases. The exact impact depends on local market conditions, the age and condition of the system, and whether the system is owned or leased.",
  },
  {
    question: "What is net metering and how does it affect my solar savings?",
    answer: "Net metering is a billing arrangement where the electricity your solar panels produce but you do not use is sent back to the grid, and you receive a credit on your electricity bill. In states with full retail-rate net metering, you receive credit at the same rate you pay for electricity. This effectively allows your panels to generate savings even when you are not home. However, net metering policies vary significantly by state, and some states have moved to alternative compensation structures with lower export rates. Check your state's current net metering policy using our calculator.",
  },
  {
    question: "Should I add battery storage to my solar panel system?",
    answer: "Battery storage makes the most financial sense in areas without net metering, with time-of-use electricity rates, or with frequent power outages. A typical home battery system costs $10,000 to $15,000 but qualifies for the 30% federal tax credit. Batteries allow you to store excess solar production for use during peak-rate hours or at night, and provide backup power during grid outages. In areas with full retail-rate net metering, batteries may not provide significant additional financial benefit but still offer energy independence and backup power value.",
  },
];

export const evChargingFaqs: FaqItem[] = [
  {
    question: "How much does it cost to install a home EV charger?",
    answer: "A Level 2 home EV charger (240V) typically costs $500 to $900 for the charging unit itself, plus $500 to $2,000 for professional electrical installation. Installation costs vary based on your home's electrical panel capacity, the distance from the panel to the charging location, and whether any panel upgrades are needed. Some homes may require a 200-amp panel upgrade costing an additional $1,500 to $3,000. Many utilities offer rebates of $250 to $500 on charger purchases or installation.",
  },
  {
    question: "What is the difference between Level 1 and Level 2 home charging?",
    answer: "Level 1 charging uses a standard 120V household outlet and adds about 3 to 5 miles of range per hour. Level 2 charging uses a 240V outlet (like a dryer outlet) and adds 25 to 35 miles of range per hour. Most EV owners install Level 2 chargers at home since they can fully charge a typical EV battery overnight in 6 to 10 hours. Level 1 charging works for PHEVs or light-use scenarios but is generally too slow for daily-driver battery EVs with larger batteries.",
  },
  {
    question: "How much does it cost to charge an EV at home versus at a public station?",
    answer: "Home charging at the national average electricity rate of $0.16/kWh costs about $8 to $12 for a full charge of a mid-size EV. Charging during off-peak hours with time-of-use rates can reduce this to $4 to $7. Public Level 2 charging typically costs $0.20 to $0.35/kWh, while DC fast charging ranges from $0.30 to $0.60/kWh or more depending on the network. A full DC fast charge can cost $20 to $35. Home charging is almost always the most cost-effective option.",
  },
  {
    question: "Can my home's electrical panel handle an EV charger?",
    answer: "Most homes with 200-amp electrical panels can support a Level 2 EV charger without upgrades. A typical 40-amp EV circuit draws about 9.6 kW. If your home has a 100-amp panel, you may need an upgrade or could use a smart charger that manages power sharing with other circuits. An electrician can assess your panel's capacity and available circuits. Some newer smart chargers and panel systems can dynamically manage loads, eliminating the need for panel upgrades in many cases.",
  },
  {
    question: "What are time-of-use (TOU) rates and how do they affect EV charging costs?",
    answer: "Time-of-use rates charge different electricity prices depending on the time of day. Off-peak hours (typically 9 PM to 6 AM) offer the lowest rates, often 40% to 60% less than peak rates. Since most EV charging happens overnight at home, TOU plans can significantly reduce charging costs. Many utilities offer special EV-specific TOU plans with even lower off-peak rates. Most EVs allow you to schedule charging to automatically start during off-peak hours. Our calculator factors in TOU rates when available for your state.",
  },
  {
    question: "How long does it take to charge an EV at home?",
    answer: "Charging time depends on the charger level, vehicle battery size, and current battery state. With a Level 2 charger (typical 32-48 amp circuit), a fully depleted 60 kWh battery charges in about 6 to 8 hours, while a larger 100 kWh battery takes 10 to 13 hours. In practice, most daily charging only needs to replenish 20 to 30 kWh (covering 80-100 miles of driving), which takes 2 to 4 hours on Level 2. Setting a daily charging limit of 80% also extends long-term battery health and reduces charging time.",
  },
];

export const heatPumpFaqs: FaqItem[] = [
  {
    question: "How much can I save by switching from a gas furnace to a heat pump?",
    answer: "Savings depend on your climate zone, local energy costs, and the efficiency of your current furnace. In moderate climates (IECC zones 3-4), heat pumps can reduce heating costs by 30% to 50% compared to gas furnaces. In cold climates (zones 5-7), modern cold-climate heat pumps can still provide savings of 10% to 30%, though supplemental heating may be needed on the coldest days. Additionally, since heat pumps provide both heating and cooling, you can replace both your furnace and air conditioner with a single system, saving on equipment and maintenance costs.",
  },
  {
    question: "Do heat pumps work in cold climates?",
    answer: "Modern cold-climate heat pumps (also called ccASHP) are designed to operate efficiently in temperatures as low as minus 15 degrees Fahrenheit. While their coefficient of performance (COP) decreases in extreme cold (from 3.5 in mild weather to about 1.8-2.0 at very low temperatures), they still provide 1.8 to 2.5 units of heat for every unit of electricity consumed, making them more efficient than electric resistance heating. Many cold-climate installations use a dual-fuel approach, pairing the heat pump with an existing gas furnace as backup for the coldest days.",
  },
  {
    question: "What is a heat pump's coefficient of performance (COP)?",
    answer: "COP measures how efficiently a heat pump converts electricity into heating or cooling. A COP of 3.0 means the heat pump produces 3 units of heat energy for every 1 unit of electrical energy consumed. By comparison, a gas furnace has an effective COP of about 0.92 to 0.96 (92-96% efficiency), and electric resistance heating has a COP of exactly 1.0. Modern heat pumps achieve COPs of 2.5 to 4.0 for heating and 3.0 to 5.0 for cooling, depending on outdoor temperature and equipment quality. Our calculator uses regional COP estimates based on your state's climate.",
  },
  {
    question: "How much does it cost to install a heat pump?",
    answer: "A ducted air-source heat pump system typically costs $12,000 to $20,000 for equipment and installation. Ductless mini-split systems range from $3,000 to $8,000 per zone. Ground-source (geothermal) heat pumps cost $20,000 to $35,000 but offer even higher efficiency. The federal 25C tax credit covers 30% of costs up to $2,000, and many states offer additional rebates of $1,000 to $10,000. The Inflation Reduction Act's High-Efficiency Electric Home Rebate Act (HEEHRA) provides additional rebates of up to $8,000 for income-qualifying households.",
  },
  {
    question: "What is the lifespan of a heat pump compared to a gas furnace?",
    answer: "Air-source heat pumps typically last 12 to 20 years, comparable to gas furnaces which last 15 to 20 years. Ground-source heat pump indoor components last 20 to 25 years, while the underground loop system can last 50 years or more. Heat pumps have lower annual maintenance costs ($100 to $200 per year) compared to gas furnaces ($150 to $300 per year) since they have no combustion components, gas connections, or venting systems to maintain. Regular filter changes and annual professional inspections are recommended for both systems.",
  },
  {
    question: "Can I use a heat pump for both heating and cooling?",
    answer: "Yes. A heat pump is essentially a two-way air conditioner. In cooling mode, it works identically to a traditional AC unit, removing heat from your home. In heating mode, it reverses the process, extracting heat from outdoor air (even in cold weather) and transferring it inside. This dual functionality means a single heat pump system replaces both your furnace and air conditioner, simplifying your HVAC system and reducing overall equipment costs. Modern heat pumps are as effective at cooling as dedicated air conditioners with similar SEER ratings.",
  },
];

export const evTaxCreditFaqs: FaqItem[] = [
  {
    question: "How does the federal EV tax credit work?",
    answer: "The federal Clean Vehicle Tax Credit (Section 30D) provides up to $7,500 for purchasing a new qualifying electric vehicle. The credit is split into two components: $3,750 for meeting critical mineral requirements and $3,750 for meeting battery component requirements. Starting in 2024, buyers can transfer the credit to the dealer at the point of sale for an immediate price reduction instead of waiting to claim it on their tax return. The vehicle must be assembled in North America and meet specific battery sourcing requirements to qualify.",
  },
  {
    question: "What are the income limits for the EV tax credit?",
    answer: "For new EVs, your modified adjusted gross income (MAGI) must not exceed $150,000 for single filers, $225,000 for head of household, or $300,000 for joint filers. You can use either the current year or prior year income, whichever qualifies. For used EVs, the limits are lower: $75,000 for single filers, $112,500 for head of household, or $150,000 for joint filers. If your income exceeds these limits, you are not eligible for the credit regardless of the vehicle's qualifying status.",
  },
  {
    question: "What is the MSRP cap for the EV tax credit?",
    answer: "For the new vehicle credit, sedans, hatchbacks, and wagons must have an MSRP of $55,000 or less. SUVs, trucks, and vans must have an MSRP of $80,000 or less. The MSRP used is the manufacturer's suggested retail price, not the price you actually pay (which could be higher or lower due to dealer markups or discounts). For the used EV credit, the sale price must be $25,000 or less, regardless of vehicle type.",
  },
  {
    question: "Which EVs currently qualify for the full $7,500 tax credit?",
    answer: "The list of qualifying vehicles changes frequently as manufacturers adjust their supply chains to meet battery component and critical mineral requirements. As of early 2026, vehicles from several manufacturers qualify for either the full $7,500 or a partial $3,750 credit. The IRS maintains an updated list at fueleconomy.gov. Use our calculator to check current eligibility for specific models. Some popular models that have recently qualified include certain Tesla, Chevrolet, Ford, and Volkswagen EVs assembled in North America.",
  },
  {
    question: "Can I get the EV tax credit if I lease instead of buy?",
    answer: "When you lease, the tax credit goes to the leasing company (the legal owner), not to you directly. However, many manufacturers and leasing companies pass some or all of the commercial clean vehicle credit (Section 45W) savings through to lessees as a reduced lease payment. The commercial credit has different rules: there are no income limits or MSRP caps, and the vehicle does not need to meet the same battery sourcing requirements. This means some vehicles that do not qualify for the consumer credit may still provide savings through leasing.",
  },
  {
    question: "Is there a tax credit for used EVs?",
    answer: "Yes. The Used Clean Vehicle Tax Credit (Section 25E) provides a credit of up to $4,000 or 30% of the sale price, whichever is less, for purchasing a qualifying used EV. The vehicle must be purchased from a licensed dealer (not a private sale), be at least 2 model years old, have a sale price of $25,000 or less, and not have previously been the subject of a used vehicle credit claim. Income limits are $75,000 for single filers and $150,000 for joint filers. This credit can also be transferred to the dealer for a point-of-sale reduction.",
  },
];
