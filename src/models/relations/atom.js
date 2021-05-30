export default class Atom {
  constructor() {
    this.name = "atom";
    this.title = "Заключить соглашение о строительстве АЭС";
    this.statInfo = "Строится АЭС в других странах";
    this.icon =
      "m66.49 24.29c-0.7627 0.7627-0.7627 1.999 0 2.762 0.6078 0.608 0.6078 1.597 0 2.205-1.032 1.032-1.601 2.405-1.601 3.865 0 1.46 0.5686 2.832 1.601 3.865 0.3814 0.3814 0.8812 0.5721 1.381 0.5721 0.4998 0 0.9998-0.1908 1.381-0.5721 0.7627-0.7627 0.7627-1.999 0-2.762-0.2947-0.2945-0.4568-0.6861-0.4568-1.103 0-0.4164 0.1621-0.808 0.4568-1.103 2.131-2.131 2.131-5.598 0-7.729-0.7627-0.7629-1.999-0.7627-2.762-1.96e-4zm8.341 8.832c0 1.46 0.5686 2.832 1.601 3.865 0.3814 0.3814 0.8813 0.5721 1.381 0.5721s0.9998-0.1908 1.381-0.5721c0.7627-0.7627 0.7627-1.999 0-2.762-0.2947-0.2945-0.4568-0.6861-0.4568-1.103 0-0.4164 0.1621-0.808 0.4568-1.103 2.131-2.131 2.131-5.598 0-7.729-0.7627-0.7627-1.999-0.7627-2.762 0-0.7627 0.7627-0.7627 1.999 0 2.762 0.6078 0.608 0.6078 1.597 0 2.205-1.032 1.032-1.601 2.405-1.601 3.865zm-35.19 36.85 5.081-8.8c0.2592-0.4393 0.3367-0.9631 0.2145-1.46-0.127-0.5158-0.4586-0.9574-0.9184-1.224-2.632-1.523-5.639-2.328-8.695-2.328s-6.063 0.8051-8.695 2.328c-0.4672 0.2703-0.801 0.7225-0.9234 1.248-0.1133 0.4855-0.03594 0.9951 0.2127 1.424l5.088 8.812c-0.3975 0.4795-0.7164 1.026-0.9379 1.62h-10.18c-1.078 0-1.952 0.8732-1.953 1.951-0.0029 3.041 0.8033 6.048 2.331 8.694 1.528 2.647 3.729 4.848 6.364 6.366 0.299 0.1723 0.6352 0.2602 0.9738 0.2602 0.1895 0 0.3795-0.02754 0.5645-0.08301 0.4789-0.1441 0.8832-0.467 1.131-0.8982l5.086-8.809c0.3047 0.05156 0.6174 0.07969 0.9365 0.07969s0.6316-0.02832 0.9363-0.07969l5.078 8.795c0.2471 0.4393 0.6551 0.7672 1.14 0.9131 0.1842 0.05547 0.3738 0.08281 0.5627 0.08281 0.3389 0 0.6756-0.08828 0.975-0.2607 2.635-1.518 4.836-3.72 6.364-6.366 1.528-2.647 2.334-5.653 2.331-8.694-9.77e-4 -1.078-0.8772-1.951-1.955-1.951h-10.18c-0.2213-0.5941-0.5402-1.141-0.9379-1.62zm-4.318 5.275c-0.9383 0-1.702-0.7633-1.702-1.702 0-0.9383 0.7633-1.702 1.702-1.702s1.701 0.7633 1.701 1.702c0 0.9383-0.7633 1.702-1.701 1.702zm0-15.18c1.712 0 3.403 0.3252 4.978 0.9502l-4.041 7c-0.3047-0.05137-0.6172-0.07969-0.9363-0.07969s-0.6316 0.02832-0.9365 0.07969l-4.041-7c1.575-0.625 3.266-0.9502 4.978-0.9502zm-8.361 24.05c-1.329-1.052-2.456-2.354-3.312-3.836s-1.42-3.109-1.666-4.786h8.083c0.2213 0.5939 0.5402 1.141 0.9377 1.62zm20.03-3.836c-0.8559 1.482-1.983 2.784-3.312 3.836l-4.043-7.002c0.3975-0.4795 0.7164-1.026 0.9377-1.62h8.083c-0.2463 1.677-0.8102 3.304-1.666 4.786zm-3.35-43.76c0.5137 0 1.018-0.209 1.381-0.5723 0.3633-0.3633 0.5725-0.8672 0.5725-1.381 0-0.5137-0.209-1.018-0.5725-1.381-0.3631-0.3633-0.867-0.5723-1.381-0.5723s-1.018 0.209-1.381 0.5723c-0.3633 0.3633-0.5723 0.8672-0.5723 1.381 0 0.5137 0.2088 1.018 0.5723 1.381 0.3635 0.3633 0.8672 0.5723 1.381 0.5723zm56.13 60.63-1.089-2.126c-7.817-15.26-11.95-32.4-11.95-49.54v-2.592c0-1.079-0.8746-1.953-1.953-1.953h-23.89c-1.079 0-1.953 0.8744-1.953 1.953v2.592c0 6.028-0.5061 12.06-1.504 18-2.862-11.45-4.337-23.25-4.337-35.05v-3.433c0-1.079-0.8746-1.953-1.953-1.953h-29.69v-4.459c0-3.842 2.882-7 6.703-7.345 0.8502-0.07695 1.552-0.6969 1.733-1.531 0.7299-3.364 3.761-5.805 7.208-5.805 2.853 0 5.478 1.672 6.687 4.261 0.2988 0.6395 0.9193 1.068 1.623 1.121 0.7051 0.05352 1.382-0.2779 1.772-0.8656 0.9854-1.481 2.633-2.365 4.407-2.365 2.187 0 4.176 1.375 4.948 3.421 0.2871 0.7602 1.015 1.263 1.827 1.263h3.131c1.625 0 2.946 1.322 2.946 2.946s-1.322 2.946-2.946 2.946h-4.756c-1.079 0-1.953 0.8744-1.953 1.953 0 1.079 0.8746 1.953 1.953 1.953h4.756c3.779 0 6.853-3.074 6.853-6.853 0-3.779-3.074-6.853-6.853-6.853h-1.895c-1.612-2.848-4.679-4.684-8.011-4.684-2.119 0-4.133 0.7244-5.741 2.012-2.116-2.589-5.324-4.163-8.748-4.163-4.808 0-9.088 3.107-10.65 7.559-2.267 0.4881-4.336 1.667-5.927 3.399-1.917 2.086-2.972 4.796-2.972 7.63v9.845c0 22.81-5.497 45.6-15.9 65.91l-1.442 2.816c-0.3102 0.6055-0.2828 1.329 0.07188 1.909 0.3549 0.5807 0.9861 0.9346 1.666 0.9346h96.09c0.6803 0 1.312-0.3539 1.666-0.9344 0.3549-0.5805 0.382-1.304 0.07188-1.909zm-36.93-52.31h19.99v0.6387c0 0.8938 0.01367 1.788 0.03535 2.681h-20.06c0.02129-0.8936 0.03496-1.787 0.03496-2.681v-0.6387zm-15.21 51.25h-42.5c9.442-18.44 14.94-38.88 16.08-59.57h14.43c1.079 0 1.953-0.8744 1.953-1.953 0-1.079-0.8746-1.953-1.953-1.953h-14.26c0.04004-1.394 0.06133-2.789 0.06133-4.185v-1.479h27.74v1.479c0 23.42 5.64 46.81 16.31 67.66zm22.25 0-0.8979-1.753c-3.72-7.263-6.808-14.84-9.246-22.63 1.543-6.444 2.516-13.02 2.904-19.64h20.38c0.9057 15.27 4.944 30.35 11.82 44.02z";
    this.score = 5;
    this.countries = [
      "AE",
      "AM",
      "BD",
      "BE",
      "BG",
      "CN",
      "CZ",
      "EG",
      "FI",
      "IN",
      "IR",
      "JO",
      "HU",
      "KW",
      "OM",
      "QA",
      "SA",
      "SK",
      "TR",
      "UZ",
      "VE",
    ];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
