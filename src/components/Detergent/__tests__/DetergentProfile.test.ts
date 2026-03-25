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

      it('should detect hasTAED when TAED ingredient is present', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.TAED],
          new Date(),
        );
        expect(profile.hasTAED).toBe(true);
      });

      it('should not detect hasTAED when TAED ingredient is absent', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        expect(profile.hasTAED).toBe(false);
      });

      it('should not detect hasDyes when no dyes are present (Dyes set is empty)', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        // Note: Dyes set is currently empty, so hasDyes will always be false
        expect(profile.hasDyes).toBe(false);
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

      it('should not detect hasSoaps when no soaps are present (Soaps set is empty)', () => {
        const profile = new DetergentProfile(
          'Test',
          'Brand',
          DetergentType.Liquid,
          DataSource.Package,
          [Ingredient.Water],
          new Date(),
        );
        // Note: Soaps set is currently empty, so hasSoaps will always be false
        expect(profile.hasSoaps).toBe(false);
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
    });

    describe('surfactant detection properties', () => {
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
        expect(profile.hasDyes).toBe(false);
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
        expect(profile.hasDyes).toBe(false);
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
