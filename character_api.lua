function SetBodyMesh(player, mesh) 
    if player == -1 then
        player = GetPlayerId()
    end
    local SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Body")
	SkeletalMeshComponent:SetSkeletalMesh(USkeletalMesh.LoadFromAsset(mesh))
end
AddEvent("Character:SetBodyMesh", SetBodyMesh)

function SetHairMesh(player, mesh) 
    if player == -1 then
        player = GetPlayerId()
    end
    
    local SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Body")
    if(SkeletalMeshComponent == nil) then
        return
    end
    SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Clothing4")
    SkeletalMeshComponent:SetSkeletalMesh(USkeletalMesh.LoadFromAsset(mesh))
end
AddEvent("Character:SetHairMesh", SetHairMesh)

function SetHairColor(player, color) 
    if player == -1 then
        player = GetPlayerId()
    end
    local SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Clothing4")
    if(SkeletalMeshComponent == nil) then
        return
    end
    local r, g, b, a = HexToRGBA("0x"..color)
    if SkeletalMeshComponent ~= nil then
        SkeletalMeshComponent:SetColorParameterOnMaterials("Hair Color", FLinearColor(r / 7,g / 7,b / 7, 1))
    end
end
AddEvent("Character:SetHairColor", SetHairColor)

function SetTopMesh(player, mesh) 
    if player == -1 then
        player = GetPlayerId()
    end
    
    local SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Body")
    if(SkeletalMeshComponent == nil) then
        return
    end
    SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Clothing0")
	SkeletalMeshComponent:SetSkeletalMesh(USkeletalMesh.LoadFromAsset(mesh))
end
AddEvent("Character:SetTopMesh", SetTopMesh)


function SetPantMesh(player, mesh) 
    if player == -1 then
        player = GetPlayerId()
    end
    
    local SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Body")
    if(SkeletalMeshComponent == nil) then
        return
    end
    SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Clothing1")
    SkeletalMeshComponent:SetSkeletalMesh(USkeletalMesh.LoadFromAsset(mesh))
end
AddEvent("Character:SetPantMesh", SetPantMesh)


function SetShoesMesh(player, mesh) 
    if player == -1 then
        player = GetPlayerId()
    end
    
    local SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Body")
    if(SkeletalMeshComponent == nil) then
        return
    end
    SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(player, "Clothing2")
    SkeletalMeshComponent:SetSkeletalMesh(USkeletalMesh.LoadFromAsset(mesh))
end
AddEvent("Character:SetShoesMesh", SetShoesMesh)

function CharacterSetPart(player, partType, value)
    if partType == "body" then
        SetBodyMesh(player, value)
    elseif partType == "hair" then
        SetHairMesh(player, value)
    elseif partType == "hairColor" then
        SetHairColor(player, value)
    elseif partType == "top" then
        SetTopMesh(player, value)
    elseif partType == "pant" then
        SetPantMesh(player, value)
    elseif partType == "shoes" then
        SetShoesMesh(player, value)
    end
end
AddRemoteEvent("Character:Style:SetPart", CharacterSetPart)

AddEvent("OnPlayerStreamIn", function(player)
    if GetPlayerPropertyValue(player, "body") ~= nil then
        SetBodyMesh(player, GetPlayerPropertyValue(player, "body"))
        SetHairMesh(player, GetPlayerPropertyValue(player, "hair"))
        SetHairColor(player, GetPlayerPropertyValue(player, "hairColor"))
        SetTopMesh(player, GetPlayerPropertyValue(player, "top"))
        SetPantMesh(player, GetPlayerPropertyValue(player, "pant"))
        SetShoesMesh(player, GetPlayerPropertyValue(player, "shoes"))

        -- Plate tag
        TogglePlayerTag(player, "health", false)
        TogglePlayerTag(player, "armor", false)
        if GetPlayerPropertyValue(player, "isInvisible") ~= nil then
            if GetPlayerPropertyValue(player, "isInvisible") == "true" then
                TogglePlayerTag(player, "name", false)
                TogglePlayerTag(player, "voice", false)
            end
        end
    end

    -- Scale character
    if GetPlayerPropertyValue(player, "characterScale") ~= nil then
        Actor = GetPlayerActor(player)
        local scale = GetPlayerPropertyValue(player, "characterScale")
        Actor:SetActorScale3D(FVector(tonumber(scale), tonumber(scale), tonumber(scale)))
        AddPlayerChat(PropertyValue)
    end
end)

AddEvent("OnPlayerNetworkUpdatePropertyValue", function(player, PropertyName, PropertyValue)
    if PropertyName == "characterScale" then
        Actor = GetPlayerActor(player)
        Actor:SetActorScale3D(FVector(tonumber(PropertyValue), tonumber(PropertyValue), tonumber(PropertyValue)))
        AddPlayerChat(PropertyValue)
    end
end)


function UnFreezePlayer()
    SetIgnoreMoveInput(false)
end
AddRemoteEvent("Character:UnFreezePlayer", UnFreezePlayer)

function FreezePlayer()
    SetIgnoreMoveInput(true)
end
AddRemoteEvent("Character:FreezePlayer", FreezePlayer)

