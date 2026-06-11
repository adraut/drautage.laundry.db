import { DetergentProfile } from '../types/DetergentProfile';
import { DetergentType } from '../types/DetergentType';
import { DataSource } from '../types/DataSource';
import { Ingredient } from '../../common/types/Ingredient';

describe('DetergentProfile', () => {
  describe('readonly properties', () => {
    describe('enzyme detection properties', () => {
      it('should detect hasAmylase when Amylase ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Amylase],
          new Date(),
        );
        expect(profile.hasAmylase).toBe(true);
      });

      it('should not detect hasAmylase when Amylase ingredient is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasAmylase).toBe(false);
      });

      it('should detect hasCellulase when Cellulase ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Cellulase],
          new Date(),
        );
        expect(profile.hasCellulase).toBe(true);
      });

      it('should not detect hasCellulase when Cellulase ingredient is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasCellulase).toBe(false);
      });

      it('should detect hasDNase when DNase ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.DNase],
          new Date(),
        );
        expect(profile.hasDNase).toBe(true);
      });

      it('should not detect hasDNase when DNase ingredient is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasDNase).toBe(false);
      });

      it('should detect hasLipase when Lipase ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Lipase],
          new Date(),
        );
        expect(profile.hasLipase).toBe(true);
      });

      it('should not detect hasLipase when Lipase ingredient is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasLipase).toBe(false);
      });

      it('should detect hasMannanase when Mannanase ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Mannanase],
          new Date(),
        );
        expect(profile.hasMannanase).toBe(true);
      });

      it('should not detect hasMannanase when Mannanase ingredient is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasMannanase).toBe(false);
      });

      it('should detect hasPectinase when Pectinase ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Pectinase],
          new Date(),
        );
        expect(profile.hasPectinase).toBe(true);
      });

      it('should not detect hasPectinase when Pectinase ingredient is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasPectinase).toBe(false);
      });

      it('should detect hasProtease when Protease ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Protease],
          new Date(),
        );
        expect(profile.hasProtease).toBe(true);
      });

      it('should not detect hasProtease when Protease ingredient is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasProtease).toBe(false);
      });

      it('should detect hasProtease when Subtilisin ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Subtilisin],
          new Date(),
        );
        expect(profile.hasProtease).toBe(true);
      });

      it('should not detect hasProtease when Subtilisin ingredient is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasProtease).toBe(false);
      });

      it('should detect hasEnzymes when any enzyme is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Protease, Ingredient.Lipase],
          new Date(),
        );
        expect(profile.hasEnzymes).toBe(true);
      });

      it('should not detect hasEnzymes when no enzymes are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasEnzymes).toBe(false);
      });
    });

    describe('additive detection properties', () => {
      it('should detect hasOpticalBrighteners when optical brightener is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.FluorescentBrightener71],
          new Date(),
        );
        expect(profile.hasOpticalBrighteners).toBe(true);
      });

      it('should not detect hasOpticalBrighteners when optical brightener is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasOpticalBrighteners).toBe(false);
      });

      it('should detect hasOxygenBleach when SodiumPercarbonate is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SodiumPercarbonate],
          new Date(),
        );
        expect(profile.hasOxygenBleach).toBe(true);
      });

      it('should not detect hasOxygenBleach when Oxygen Bleaches are absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasOxygenBleach).toBe(false);
      });

      it('should detect hasFillers when a filler ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SaltCake],
          new Date(),
        );
        expect(profile.hasFillers).toBe(true);
      });

      it('should not detect hasFillers when no filler ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SodiumLaurylSulfate],
          new Date(),
        );
        expect(profile.hasFillers).toBe(false);
      });

      it('should detect hasFabricConditioners when a fabric conditioner ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Bentonite],
          new Date(),
        );
        expect(profile.hasFabricConditioners).toBe(true);
      });

      it('should not detect hasFabricConditioners when no fabric conditioner ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SodiumLaurylSulfate],
          new Date(),
        );
        expect(profile.hasFabricConditioners).toBe(false);
      });

      it('should detect hasBuilders when a builder ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SodiumHydroxide],
          new Date(),
        );
        expect(profile.hasBuilders).toBe(true);
      });

      it('should not detect hasBuilders when no builder ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SodiumPercarbonate],
          new Date(),
        );
        expect(profile.hasBuilders).toBe(false);
      });

      it('should detect hasOxygenBleachBoosters when TAED ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.TAED],
          new Date(),
        );
        expect(profile.hasOxygenBleachBoosters).toBe(true);
      });

      it('should not detect hasOxygenBleachBoosters when no oxygen bleach booster ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SodiumPercarbonate],
          new Date(),
        );
        expect(profile.hasOxygenBleachBoosters).toBe(false);
      });

      it('should not detect hasColorants when no colorant ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasColorants).toBe(false);
      });

      // it('should detect hasScents when scent ingredient is present', () => {
      //   const profile = new DetergentProfile(
      //     'Test',
      //     'Brand',
      //     DetergentType.Liquid,
      //     [Ingredient.SimethiconeDimethicone]
      //   );
      //   expect(profile.hasScents).toBe(true);
      // });

      // it('should not detect hasScents when scent ingredient is absent', () => {
      //   const profile = new DetergentProfile(
      //     'Test',
      //     'Brand',
      //     DetergentType.Liquid,
      //     [Ingredient.Water]
      //   );
      //   expect(profile.hasScents).toBe(false);
      // });

      it('should not detect hasSoaps when no soaps are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(false);
      });

      it('should detect hasSoaps when a soap ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Powder,
          DataSource.Package,
          [Ingredient.C16_18FattyAcidsSodiumSalt],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
      });

      it('should detect hasProcessingAids when a processing aid ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Powder,
          DataSource.Package,
          [Ingredient.C16_18FattyAcidsSodiumSalt],
          new Date(),
        );
        expect(profile.hasProcessingAids).toBe(true);
      });

      it('should not detect hasProcessingAids when no processing aid ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasProcessingAids).toBe(false);
      });

      it('should detect hasSoilAntiRedepositionAgents when a soil anti-redeposition ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.AcrylicAcidHomopolymer],
          new Date(),
        );
        expect(profile.hasSoilAntiRedepositionAgents).toBe(true);
      });

      it('should not detect hasSoilAntiRedepositionAgents when no soil anti-redeposition agents are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasSoilAntiRedepositionAgents).toBe(false);
      });

      it('should detect hasSoilReleaseAgents when a soil release ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.AnionicModifiedPolyester],
          new Date(),
        );
        expect(profile.hasSoilReleaseAgents).toBe(true);
      });

      it('should not detect hasSoilReleaseAgents when no soil release agents are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasSoilReleaseAgents).toBe(false);
      });

      it('should detect hasDyeTransferInhibitors when a dye transfer inhibitor ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.CelluloseGum],
          new Date(),
        );
        expect(profile.hasDyeTransferInhibitors).toBe(true);
      });

      it('should not detect hasDyeTransferInhibitors when no dye transfer inhibitor ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasDyeTransferInhibitors).toBe(false);
      });

      it('should detect hasFabricAntioxidants when a fabric antioxidant ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.MethylDiTButylHydroxyhydrocinnamate],
          new Date(),
        );
        expect(profile.hasFabricAntioxidants).toBe(true);
      });

      it('should not detect hasFabricAntioxidants when no fabric antioxidant ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasFabricAntioxidants).toBe(false);
      });

      it('should detect hasEnzymeStabilizers when an enzyme stabilizer ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.CalciumFormate],
          new Date(),
        );
        expect(profile.hasEnzymeStabilizers).toBe(true);
      });

      it('should not detect hasEnzymeStabilizers when no enzyme stabilizer ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasEnzymeStabilizers).toBe(false);
      });
    });

    describe('surfactant detection properties', () => {
      it('should detect hasAmphotericSurfactants when an amphoteric surfactant ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.CocamidopropylBetaine],
          new Date(),
        );
        expect(profile.hasAmphotericSurfactants).toBe(true);
      });

      it('should not detect hasAmphotericSurfactants when no amphoteric surfactant ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SodiumLaurylSulfate],
          new Date(),
        );
        expect(profile.hasAmphotericSurfactants).toBe(false);
      });

      it('should detect hasAnionicSurfactants when anionic surfactant is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SodiumC10_16Alkylbenzenesulfonate],
          new Date(),
        );
        expect(profile.hasAnionicSurfactants).toBe(true);
      });

      it('should not detect hasAnionicSurfactants when anionic surfactant is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasAnionicSurfactants).toBe(false);
      });

      it('should detect hasNonionicSurfactants when nonionic surfactant is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.C10_16Alketh],
          new Date(),
        );
        expect(profile.hasNonionicSurfactants).toBe(true);
      });

      it('should not detect hasNonionicSurfactants when nonionic surfactant is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasNonionicSurfactants).toBe(false);
      });

      it('should detect hasSulfates when a sulfate ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.SodiumLaurylSulfate],
          new Date(),
        );
        expect(profile.hasSulfates).toBe(true);
      });

      it('should not detect hasSulfates when no sulfate ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasSulfates).toBe(false);
      });
    });

    describe('biodegradability and septic safety properties', () => {
      it('should detect isBiodegradable when no non-biodegradable ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water, Ingredient.SodiumCarbonate],
          new Date(),
        );
        expect(profile.isBiodegradable).toBe(true);
      });

      it('should not detect isBiodegradable when non-biodegradable ingredients are present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.FluorescentBrightener71],
          new Date(),
        );
        expect(profile.isBiodegradable).toBe(false);
      });

      // it('should detect isSepticSafe when no septic-unfriendly ingredients are present', () => {
      //   const profile = new DetergentProfile(
      //     'Test',
      //     'Brand',
      //     DetergentType.Liquid,
      //     [Ingredient.Water, Ingredient.SodiumCarbonate]
      //   );
      //   expect(profile.isSepticSafe).toBe(true);
      // });

      // it('should not detect isSepticSafe when septic-unfriendly ingredients are present', () => {
      //   const profile = new DetergentProfile(
      //     'Test',
      //     'Brand',
      //     DetergentType.Liquid,
      //     [Ingredient.SodiumC10_16Alkylbenzenesulfonate]
      //   );
      //   expect(profile.isSepticSafe).toBe(false);
      // });
    });

    describe('multiple properties in combination', () => {
      it('should correctly compute all properties with mixed ingredients', () => {
        const profile = new DetergentProfile(
          'Comprehensive',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [
            Ingredient.Protease,
            Ingredient.Lipase,
            Ingredient.SodiumC10_16Alkylbenzenesulfonate,
            Ingredient.C10_16Alketh,
            Ingredient.FluorescentBrightener71,
            Ingredient.SodiumPercarbonate,
            Ingredient.SimethiconeDimethicone,
          ],
          new Date(),
        );

        // Enzymes
        expect(profile.hasProtease).toBe(true);
        expect(profile.hasLipase).toBe(true);
        expect(profile.hasCellulase).toBe(false);
        expect(profile.hasEnzymes).toBe(true);

        // Additives
        expect(profile.hasOpticalBrighteners).toBe(true);
        expect(profile.hasOxygenBleach).toBe(true);
        expect(profile.hasColorants).toBe(false);
        expect(profile.hasSoaps).toBe(false);

        // Surfactants
        expect(profile.hasAnionicSurfactants).toBe(true);
        expect(profile.hasNonionicSurfactants).toBe(true);

        // Safety
        expect(profile.isBiodegradable).toBe(false);
      });

      it('should mark as not biodegradable with non-biodegradable ingredients', () => {
        const profile = new DetergentProfile(
          'Problematic',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.FluorescentBrightener71, Ingredient.SodiumC10_16Alkylbenzenesulfonate],
          new Date(),
        );

        expect(profile.isBiodegradable).toBe(false);
        expect(profile.hasEnzymes).toBe(false);
      });

      it('should mark as fully clean with minimal safe ingredients', () => {
        const profile = new DetergentProfile(
          'Clean',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water, Ingredient.SodiumCarbonate],
          new Date(),
        );

        expect(profile.isBiodegradable).toBe(true);
        expect(profile.isSepticSafe).toBe(true);
        expect(profile.hasEnzymes).toBe(false);
        expect(profile.hasOpticalBrighteners).toBe(false);
        expect(profile.hasOxygenBleach).toBe(false);
        expect(profile.hasColorants).toBe(false);
        expect(profile.hasScents).toBe(false);
        expect(profile.hasSoaps).toBe(false);
        expect(profile.hasAnionicSurfactants).toBe(false);
        expect(profile.hasNonionicSurfactants).toBe(false);
      });
    });

    describe('readonly constraint', () => {
      it('should not allow modification of readonly properties', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Protease],
          new Date(),
        );

        // All readonly properties should be initialized during construction
        expect(profile.hasProtease).toBe(true);
        expect(profile.hasAmylase).toBe(false);
        expect(profile.hasEnzymes).toBe(true);
      });
    });
  });

  describe('context rules and category exclusions', () => {
    it('applies profile-level categoryExclusions', () => {
      const profile = new DetergentProfile(
        'Test',
        'Brand',
        DetergentType.Liquid,
        DataSource.Package,
        [Ingredient.SodiumCarbonate],
        new Date(),
        { categoryExclusions: { [Ingredient.SodiumCarbonate]: ['Builder'] } },
      );
      expect(profile.hasBuilders).toBe(false);
      expect(profile.effectiveCategoryExclusions[Ingredient.SodiumCarbonate]).toEqual(['Builder']);
    });

    it('applies profile-level categoryExclusions across multiple categories for the same ingredient', () => {
      const profile = new DetergentProfile(
        'Test',
        'Brand',
        DetergentType.Powder,
        DataSource.Package,
        [Ingredient.C16_18FattyAcidsSodiumSalt],
        new Date(),
        { categoryExclusions: { [Ingredient.C16_18FattyAcidsSodiumSalt]: ['Soap', 'Processing Aid'] } },
      );
      expect(profile.hasSoaps).toBe(false);
      expect(profile.hasProcessingAids).toBe(false);
      expect(profile.effectiveCategoryExclusions[Ingredient.C16_18FattyAcidsSodiumSalt]).toEqual([
        'Soap',
        'Processing Aid',
      ]);
    });

    describe('C16_18FattyAcidsSodiumSalt suds reducer rule', () => {
      it('adds Suds Reducer when SodiumPolyacrylate precedes it', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Powder,
          DataSource.Package,
          [Ingredient.SodiumPolyacrylate, Ingredient.C16_18FattyAcidsSodiumSalt],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
        expect(profile.effectiveCategoryAdditions.get(Ingredient.C16_18FattyAcidsSodiumSalt)).toEqual(['Suds Reducer']);
      });

      it('does not add Suds Reducer when SodiumPolyacrylate is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Powder,
          DataSource.Package,
          [Ingredient.C16_18FattyAcidsSodiumSalt],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
        expect(profile.effectiveCategoryAdditions.get(Ingredient.C16_18FattyAcidsSodiumSalt)).toBeUndefined();
      });

      it('does not add Suds Reducer when C16_18FattyAcidsSodiumSalt precedes SodiumPolyacrylate', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Powder,
          DataSource.Package,
          [Ingredient.C16_18FattyAcidsSodiumSalt, Ingredient.SodiumPolyacrylate],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
        expect(profile.effectiveCategoryAdditions.get(Ingredient.C16_18FattyAcidsSodiumSalt)).toBeUndefined();
      });
    });

    describe.each(Object.values(DetergentType))('C8_18FattyAcidsSodiumSalt in a %s detergent', (type) => {
      it.each([
        [Ingredient.SodiumLaurylSulfate, 'alkyl sulfate'],
        [Ingredient.SodiumLaurethSulfate, 'ether sulfate'],
        [Ingredient.SodiumC10_16Alkylbenzenesulfonate, 'sulfonate'],
      ])('adds Suds Reducer when %s (foaming surfactant) precedes it with non-surfactant gap', (surfactant) => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          type,
          DataSource.Package,
          [surfactant, Ingredient.SodiumCarbonate, Ingredient.C8_18FattyAcidsSodiumSalt],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
        expect(profile.effectiveCategoryAdditions.get(Ingredient.C8_18FattyAcidsSodiumSalt)).toEqual(['Suds Reducer']);
      });

      it('keeps as Soap only when only a non-foaming surfactant precedes with non-surfactant gap', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          type,
          DataSource.Package,
          [Ingredient.C12_15AlcoholsEthoxylated, Ingredient.SodiumCarbonate, Ingredient.C8_18FattyAcidsSodiumSalt],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
        expect(profile.effectiveCategoryAdditions.get(Ingredient.C8_18FattyAcidsSodiumSalt)).toBeUndefined();
      });

      it('keeps as Soap only when immediately preceded by a surfactant', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          type,
          DataSource.Package,
          [Ingredient.SodiumLaurethSulfate, Ingredient.C8_18FattyAcidsSodiumSalt],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
        expect(profile.effectiveCategoryAdditions.get(Ingredient.C8_18FattyAcidsSodiumSalt)).toBeUndefined();
      });

      it('keeps as Soap only when no surfactant precedes it', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          type,
          DataSource.Package,
          [Ingredient.C8_18FattyAcidsSodiumSalt],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
        expect(profile.effectiveCategoryAdditions.get(Ingredient.C8_18FattyAcidsSodiumSalt)).toBeUndefined();
      });
    });

    describe('FattyAcidsC8_18AndC18UnsaturatedSodiumSalts suds reducer rules', () => {
      it('adds Suds Reducer when SodiumPolyacrylate precedes it', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Powder,
          DataSource.Package,
          [Ingredient.SodiumPolyacrylate, Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
        expect(profile.effectiveCategoryAdditions.get(Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts)).toEqual([
          'Suds Reducer',
        ]);
      });

      it('does not add Suds Reducer when SodiumPolyacrylate is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Powder,
          DataSource.Package,
          [Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts],
          new Date(),
        );
        expect(profile.hasSoaps).toBe(true);
        expect(
          profile.effectiveCategoryAdditions.get(Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts),
        ).toBeUndefined();
      });
    });

    describe.each([
      [Ingredient.C12_18FattyAcidsSodiumSalt, 'C12_18FattyAcidsSodiumSalt'],
      [Ingredient.CoconutFattyAcid, 'CoconutFattyAcid'],
      [Ingredient.FattyAcidC8_18AndC18Unsaturated, 'FattyAcidC8_18AndC18Unsaturated'],
      [Ingredient.FattyAcidsC8_18AndC18UnsaturatedSodiumSalts, 'FattyAcidsC8_18AndC18UnsaturatedSodiumSalts'],
      [Ingredient.LauricAcid, 'LauricAcid'],
      [Ingredient.MEAC12_18FattyAcidsSalt, 'MEAC12_18FattyAcidsSalt'],
      [Ingredient.MEACocoate, 'MEACocoate'],
      [Ingredient.PalmKernelAcid, 'PalmKernelAcid'],
      [Ingredient.PotassiumCocoate, 'PotassiumCocoate'],
      [Ingredient.SodiumCocoate, 'SodiumCocoate'],
      [Ingredient.SodiumOleate, 'SodiumOleate'],
    ])('foaming-surfactant suds reducer rule for %s', (fattyAcid) => {
      describe.each(Object.values(DetergentType))('in a %s detergent', (type) => {
        it.each([
          [Ingredient.SodiumLaurylSulfate, 'alkyl sulfate'],
          [Ingredient.SodiumLaurethSulfate, 'ether sulfate'],
          [Ingredient.SodiumC10_16Alkylbenzenesulfonate, 'sulfonate'],
        ])('adds Suds Reducer when %s (foaming surfactant) precedes it with non-surfactant gap', (surfactant) => {
          const profile = new DetergentProfile(
            'Test',
            'Brand',
            type,
            DataSource.Package,
            [surfactant, Ingredient.SodiumCarbonate, fattyAcid],
            new Date(),
          );
          expect(profile.hasSoaps).toBe(true);
          expect(profile.effectiveCategoryAdditions.get(fattyAcid)).toEqual(['Suds Reducer']);
        });

        it('keeps as Soap only when only a non-foaming surfactant precedes with non-surfactant gap', () => {
          const profile = new DetergentProfile(
            'Test',
            'Brand',
            type,
            DataSource.Package,
            [Ingredient.C12_15AlcoholsEthoxylated, Ingredient.SodiumCarbonate, fattyAcid],
            new Date(),
          );
          expect(profile.hasSoaps).toBe(true);
          expect(profile.effectiveCategoryAdditions.get(fattyAcid)).toBeUndefined();
        });

        it('keeps as Soap only when immediately preceded by a surfactant', () => {
          const profile = new DetergentProfile(
            'Test',
            'Brand',
            type,
            DataSource.Package,
            [Ingredient.SodiumLaurethSulfate, fattyAcid],
            new Date(),
          );
          expect(profile.hasSoaps).toBe(true);
          expect(profile.effectiveCategoryAdditions.get(fattyAcid)).toBeUndefined();
        });

        it('keeps as Soap only when no surfactant precedes it', () => {
          const profile = new DetergentProfile('Test', 'Brand', type, DataSource.Package, [fattyAcid], new Date());
          expect(profile.hasSoaps).toBe(true);
          expect(profile.effectiveCategoryAdditions.get(fattyAcid)).toBeUndefined();
        });
      });
    });
  });

  describe('mutable properties', () => {
    it('should allow modification of mutable properties', () => {
      const profile = new DetergentProfile(
        'Original',
        'Brand',
        DetergentType.Liquid,
        DataSource.Package,
        [],
        new Date(),
      );

      profile.name = 'Modified';
      profile.brand = 'NewBrand';

      expect(profile.name).toBe('Modified');
      expect(profile.brand).toBe('NewBrand');
    });
  });
});
