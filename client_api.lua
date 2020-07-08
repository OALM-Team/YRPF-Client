WaypointsList = {}
I18N = {}

function OnPackageStart()
    CreateTimer(function()
        UpdateVehicleState()
    end, 150)

    CreateTimer(function()
        UpdateCharacterPositionToUI()
    end, 1000 / 60) 
end
AddEvent("OnPackageStart", OnPackageStart)

AddEvent("OnPlayerStartEnterVehicle", function(vehicleId, seatId)
    if GetPlayerPropertyValue(GetPlayerId(), "cuffed") == 1 then
        SendLocalToast("error", GetI18NText("toast.cuffed.you_are_cuff"))
        return false 
    end

    if GetVehiclePropertyValue(vehicleId, "locked") == 1 then
        SendLocalToast("error", GetI18NText("action.vehicle.locked"))
        return false 
    end
    if GetPlayerPropertyValue(GetPlayerId(), "wearId") ~= nil and GetPlayerPropertyValue(GetPlayerId(), "wearId") ~= "" then
        SendLocalToast("error", GetI18NText("action.vehicle.wearSomething"))
        return false
    end
end)

AddEvent("OnPickupStreamIn", function(pickup)
	local color = GetPickupPropertyValue(pickup, "color")
	if color ~= nil and color ~= "" then
		SetPickupColor(pickup, color)
	end
end)

AddEvent("OnNPCStreamIn", function(npc)
    if GetNPCPropertyValue(npc, "clothing") ~= nil then
        SetNPCClothingPreset(npc, GetNPCPropertyValue(npc, "clothing"))
    end
end)

function UpdateVehicleState()
    local vehicle = GetPlayerVehicle(GetPlayerId())
    
	if vehicle ~= 0 and vehicle ~= nil and vehicle ~= '0' then
		local speed = math.floor(GetVehicleForwardSpeed(vehicle))
        local rpm = math.floor(GetVehicleEngineRPM(vehicle))
        local lightState = tostring(GetVehicleLightState(vehicle))
        local fuel = GetVehiclePropertyValue(vehicle, "fuel")
        
		ExecuteWebJS(GlobalUI, 'dispatchPayload({"type": "SET_VEHICLE_STATE", "visible": true, "currentMph": '..speed..', "lightState": '..lightState..', "fuel": '..fuel..'})')
    else
        ExecuteWebJS(GlobalUI, 'dispatchPayload({"type": "SET_VEHICLE_STATE", "visible": false, "currentMph": 0})')
	end
end

function SetPickupColor(pickup, HexColor)
	local color = "0x" .. HexColor
    local StaticMeshComponent = GetPickupStaticMeshComponent(pickup)
    StaticMeshComponent:SetMaterial(0, UMaterialInterface.LoadFromAsset("/Game/Scripting/Materials/MI_TranslucentLit"))
    local MaterialInstance = StaticMeshComponent:CreateDynamicMaterialInstance(0)
    local r, g, b, a = HexToRGBAFloat(color)
    MaterialInstance:SetColorParameter("BaseColor", FLinearColor(r, g, b, 0.4))
end

function SendLocalToast(type, message)
    ExecuteWebJS(GlobalUI, 'dispatchPayload({"type": "ADD_TOAST", "notifType": "'..type..'", "message": "'..message..'"})')
end

function PlaySound3D(fileName, x, y, z, radius, volume)
    SetSoundVolume(CreateSound3D(fileName, x, y, z, radius), volume)
end
AddRemoteEvent("Sound:PlaySound3D", PlaySound3D)

function UpdateCharacterPositionToUI()
    local x,y,z = GetPlayerLocation(GetPlayerId())
    local h = GetPlayerHeading(GetPlayerId())
    local _, ch = GetCameraRotation()
    if ch == nil then
        ch = 0
    end

    ExecuteWebJS(GlobalUI, 'dispatchPayload({"type": "UPDATE_CHARACTER_POSITION", "x": '..x..', "y": '..y..'})')
    ExecuteWebJS(GlobalUI, 'dispatchPayload({"type": "UPDATE_CHARACTER_HEADING", "heading": '..h..', "cameraHeading": '..ch..'})')
end

function BlinkVehicleLights(veh)
    SetVehicleLightEnabled(veh, true)
    Delay(300, function ()
        SetVehicleLightEnabled(veh, false)
        Delay(150, function ()
            SetVehicleLightEnabled(veh, true)
            Delay(150, function ()
                SetVehicleLightEnabled(veh, false)
            end)
        end)
    end)
end
AddEvent("BlinkVehicleLights", BlinkVehicleLights)

local chatShow = true
AddEvent("OnKeyPress", function(key)
    -- Lock toogle vehicle
    if(IsCtrlPressed() and key == "L") then
        CallRemoteEvent("Vehicle:RequestLockToogle")
    end

    if(IsCtrlPressed() and key == "G") then
        CallRemoteEvent("Weapon:StoreWeapon")
    end

    if(IsCtrlPressed() and key == "I") then
        CallRemoteEvent("Character:Interact")
    end

    -- ShowMap
    if(key == "M") then
        CallRemoteEvent("GlobalUI:ToogleWindow", "bigmap")
    end

    if(key == "F10") then
        if chatShow then
            ShowHealthHUD(false)
            ShowWeaponHUD(false)
            ShowChat(false)
            chatShow = true
        else
            ShowHealthHUD(false)
            ShowWeaponHUD(false)
            ShowChat(true)
            chatShow = false
        end
    end
end)

AddRemoteEvent("Map:AddWaypoint", function(name, uuid, x,y,z)
    WaypointsList[uuid] = CreateWaypoint(x,y,z, name)
end)

AddRemoteEvent("Map:RemoveWaypoint", function(uuid)
    DestroyWaypoint(WaypointsList[uuid])
end)

AddEvent("Local:Map:AddOrRemoveWaypoint", function(name, uuid, x,y,z)
    if(WaypointsList[uuid] ~= nil) then
        DestroyWaypoint(WaypointsList[uuid])
        WaypointsList[uuid] = nil
        return
    end
    WaypointsList[uuid] = CreateWaypoint(x,y,z, name)
end)

AddRemoteEvent("Time:SetHour", function(hour)
    SetTime(hour)
end)

function SetCameraAPI(out,height)
	local x,y,z = GetPlayerLocation()
    Delay(100, function()
        SetCameraLocation(x + out,y,z + height,true)
        SetCameraRotation(0,180,0,true)
    end)
end
AddEvent("SetCameraAPI", SetCameraAPI)

function ResetCamera()
	SetCameraLocation(0,0,0,false)
	SetCameraRotation(0,0,0,false)
end
AddEvent("ResetCamera", ResetCamera)

function SetLocalPlayerRotation(pitch, yaw, roll)
    local SkeletalMeshComponent = GetPlayerSkeletalMeshComponent(GetPlayerId(), "Body")
    SkeletalMeshComponent:SetRelativeRotation(FRotator(pitch, yaw, roll))
end
AddEvent("SetLocalPlayerRotation", SetLocalPlayerRotation)

function ResetI18n()
    I18N = {}
end
AddEvent("I18N:Reset", ResetI18n)

function AddKeyValueI18n(key, value)
    I18N[key] = value
end
AddEvent("I18N:AddKeyValue", AddKeyValueI18n)

function GetI18NText(key)
    if(I18N[key] ~= nil) then
        return I18N[key]
    end
    return key
end

function TriggerLoadLevel() 
    UpdateStreamingLevels()
    Delay(50, function()
        UpdateStreamingLevels()
    end)
end
AddRemoteEvent("Game:TriggerLoadLevel", TriggerLoadLevel)

-- Camera
local currentCameraMode = 1
local maxMode = 8
local standardCameraRightOffset = 20.0

AddEvent("OnKeyPress", function(key)
    if key == "V" and IsCtrlPressed() then
        currentCameraMode = currentCameraMode + 1
        if currentCameraMode > maxMode then
            currentCameraMode = 1
        end
        SetCameraMode()
    end
end)

function SetCameraMode()
    if currentCameraMode == 1 then
        EnableFirstPersonCamera(false)
        SetCameraLocation(0,0,0, false)
        SetCameraFoV(90)
    elseif currentCameraMode == 2 then
        EnableFirstPersonCamera(false)
        SetCameraLocation(240.0, 40.0, 0.0, false)
        SetCameraFoV(90)
    elseif currentCameraMode == 3 then
        EnableFirstPersonCamera(true)
        SetCameraLocation(0.0, 15.0, 0.0, false)
    elseif currentCameraMode == 4 then
        EnableFirstPersonCamera(false)
        SetCameraLocation(200, standardCameraRightOffset, 0.0, false)
        SetCameraFoV(110)
    elseif currentCameraMode == 5 then
        EnableFirstPersonCamera(false)
        SetCameraLocation(170, standardCameraRightOffset, 0.0, false)
        SetCameraFoV(110)
    elseif currentCameraMode == 6 then
        EnableFirstPersonCamera(false)
        SetCameraLocation(140, standardCameraRightOffset, 0.0, false)
        SetCameraFoV(110)
    elseif currentCameraMode == 7 then
        EnableFirstPersonCamera(false)
        SetCameraLocation(100, standardCameraRightOffset, 0.0, false)
        SetCameraFoV(110)
    elseif currentCameraMode == 8 then
        EnableFirstPersonCamera(false)
        SetCameraLocation(0, standardCameraRightOffset, 0.0, false)
        SetCameraFoV(110)
    end
end